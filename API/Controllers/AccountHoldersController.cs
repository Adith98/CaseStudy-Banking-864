using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Banking_Case_Study.Models;
using Banking_Case_Study.ViewModel;

namespace Banking_Case_Study.Controllers
{
    public class AccountHoldersController : ApiController
    {
        private BankingEntities db = new BankingEntities();

        #region Account Holder Modules (Login Related)

        #region User Login
        [Route("api/userLogin")]
        [HttpPost]
        public HttpResponseMessage UserLogin(int userid, string login_password)
        {
            bool Exists = false;
            AccountHolder ah = new AccountHolder();

            var user = (from acc_holder in db.AccountHolders
                        where acc_holder.user_id == userid
                        select acc_holder.login_password).FirstOrDefault();
            var a = user;

            if (a != null)
            {
                System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
                System.Text.Decoder utf8Decode = encoder.GetDecoder();
                byte[] todecode_byte = Convert.FromBase64String(a);
                int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
                char[] decoded_char = new char[charCount];
                utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
                string decrypt_login_password = new String(decoded_char);


                List<AccountHolder> ahs = db.AccountHolders.ToList();
                foreach (var item in ahs)
                {
                    if (item.user_id == userid)
                    {
                        Exists = true;
                        ah = item;
                        break;
                    }
                }

                if (Exists)
                {
                    int status = Convert.ToInt32(ah.account_status);
                    if (status < 3)
                    {
                        if (decrypt_login_password == login_password)
                        {
                            ah.account_status = "0";
                            db.SaveChanges();

                            if (ah.last_login == null)
                            {
                                if (ah.CustomerDetail.net_banking)
                                {
                                    ah.last_login = DateTime.Now;
                                    db.SaveChanges();
                                    return Request.CreateResponse(HttpStatusCode.OK, "First Login");
                                }
                                else
                                {
                                    ah.last_login = DateTime.Now;
                                    db.SaveChanges();
                                    return Request.CreateResponse(HttpStatusCode.OK, "First Login Without Net Banking");
                                }

                            }
                            else
                            {
                                ah.last_login = DateTime.Now;
                                db.SaveChanges();
                                if (ah.CustomerDetail.net_banking)
                                {
                                    return Request.CreateResponse(HttpStatusCode.OK, "Success");
                                }
                                else
                                {
                                    return Request.CreateResponse(HttpStatusCode.OK, "Success Without Net Banking");
                                }
                            }
                        }

                        else
                        {
                            status += 1;
                            if (status >= 3)
                            {
                                ah.account_status = "3";
                                db.SaveChanges();
                                return Request.CreateResponse(HttpStatusCode.OK, "Failed after 3 unsuccessful login attempts");

                            }
                            else
                            {
                                ah.account_status = status.ToString();
                                db.SaveChanges();
                                return Request.CreateResponse(HttpStatusCode.OK, "Wrong Password");

                            }

                        }

                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, "Account Already Locked!");
                    }


                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Invalid User id");
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid User id");
            }


        }
        #endregion

        #region Set New Password (With Internet Banking)
        [Route("api/net-banking")]
        [HttpPut]
        public HttpResponseMessage NetBanking(double account_number, string login_password, string transaction_password, [FromBody] AccountHolder accountHolder)
        {
            accountHolder = (from p in db.AccountHolders
                             where p.account_number == account_number
                             select p).SingleOrDefault();

            if (accountHolder == null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Does not Exist");
            }
            byte[] encDataLogin_byte = new byte[login_password.Length];
            encDataLogin_byte = System.Text.Encoding.UTF8.GetBytes(login_password);
            string encodedLoginpassword = Convert.ToBase64String(encDataLogin_byte);
            accountHolder.login_password = encodedLoginpassword;

            //transaction password encryption
            byte[] encDataTrans_byte = new byte[transaction_password.Length];
            encDataTrans_byte = System.Text.Encoding.UTF8.GetBytes(transaction_password);
            string encodedTranspassword = Convert.ToBase64String(encDataTrans_byte);
            accountHolder.transaction_password = encodedTranspassword;

            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Success");
        }

        #endregion

        #region Set New Password (Without Internet Banking)
        [Route("api/UpdateLoginPassword")]
        [HttpPut]
        public IHttpActionResult UpdatePassword(string user_id, string password)
        {
            int id = Convert.ToInt32(user_id);
            AccountHolder accountHolder = db.AccountHolders.First(a => a.user_id == id);
            byte[] encDataLogin_byte = new byte[password.Length];
            encDataLogin_byte = System.Text.Encoding.UTF8.GetBytes(password);
            string encodedLoginpassword = Convert.ToBase64String(encDataLogin_byte);
            accountHolder.login_password = encodedLoginpassword;
            accountHolder.account_status = "0";
            db.SaveChanges();
            return Ok("Password Changed Successfully");
        }
        #endregion

        #region Set New Transaction Password
        [Route("api/UpdateTransactionPassword")]
        [HttpPut]
        public IHttpActionResult UpdateTransactionPassword(string user_id, string password)
        {
            int id = Convert.ToInt32(user_id);
            AccountHolder accountHolder = db.AccountHolders.First(a => a.user_id == id);
            byte[] encDataLogin_byte = new byte[password.Length];
            encDataLogin_byte = System.Text.Encoding.UTF8.GetBytes(password);
            string encodedLoginpassword = Convert.ToBase64String(encDataLogin_byte);
            accountHolder.transaction_password = encodedLoginpassword;

            db.SaveChanges();
            return Ok("Transaction Password Changed Successfully");
        }
        #endregion

        #region Get Last Login
        [Route("api/getLastLogin")]
        [HttpPost]
        public IHttpActionResult GetLastLogin(int userid)
        {
            var last_login = db.AccountHolders.FirstOrDefault(a => a.user_id == userid).last_login;
            return Ok(last_login);
        }
        #endregion

        #endregion

        #region Account Holder Modules (Dashboard)

        [Route("api/getAccHolderDetails")]
        public AccountDetail GetAccount(int id)
        {
            AccountDetail accountDetail = db.AccountHolders.Where(c => c.user_id == id).Select(c => c.AccountDetail).ToList()[0];
            //List<AccountDetail> l = db.AccountHolders.Where(c => c.user_id == id).Select(c => c.AccountDetail).ToList();
            return accountDetail;
        }


        [Route("api/getTopTransactions")]
        public List<Transaction> GetTopTransaction(int id)
        {
            long? accountno = db.AccountHolders.FirstOrDefault(c => c.user_id == id).account_number;
            List<Transaction> t1 = db.Transactions.Where(c => c.from_acc_num == accountno && c.tran_status == "Done").OrderByDescending(c => c.reference_id).ToList();
            List<Transaction> t2 = db.Transactions.Where(c => c.paid_to_acc_num == accountno && c.tran_status == "Done").OrderByDescending(c => c.reference_id).ToList();
            List<Transaction> t3 = new List<Transaction>();
            t3.AddRange(t1);
            t3.AddRange(t2);

            List<Transaction> t4 = t3.OrderByDescending(t => t.reference_id).Take(5).ToList();
            //List<Transaction> l = db.AccountHolders.Where(c => c.user_id == id).Select(c => c.Transactions).ToList();
            return t4;
        }

        [Route("api/getAllTransactions")]
        public List<Transaction> GetAllTransaction(int id)
        {
            long? accountno = db.AccountHolders.FirstOrDefault(c => c.user_id == id).account_number;
            List<Transaction> t1 = db.Transactions.Where(c => c.from_acc_num == accountno && c.tran_status == "Done").OrderByDescending(c => c.reference_id).ToList();

            List<Transaction> t2 = db.Transactions.Where(c => c.paid_to_acc_num == accountno && c.tran_status == "Done").OrderByDescending(c => c.reference_id).ToList();

            List<Transaction> t3 = new List<Transaction>();
            t3.AddRange(t1);
            t3.AddRange(t2);
            List<Transaction> t4 = t3.OrderByDescending(t => t.reference_id).Take(5).ToList();
            //List<Transaction> l = db.AccountHolders.Where(c => c.user_id == id).Select(c => c.Transactions).ToList();
            return t4;
        }

        #region Account Statement
        [Route("api/getFilter")]
        public IEnumerable<Transaction> GetBetweenDate(int id, DateTime startd, DateTime endd)
        {
            long? accountno = db.AccountHolders.FirstOrDefault(c => c.user_id == id).account_number;
            List<Transaction> t1 = db.Transactions.Where(c => (c.from_acc_num == accountno && c.tran_status == "Done") && (c.trans_time >= startd && c.trans_time <= endd)).ToList();
            List<Transaction> t2 = db.Transactions.Where(c => (c.paid_to_acc_num == accountno && c.tran_status == "Done") && (c.trans_time >= startd && c.trans_time <= endd)).ToList();

            List<Transaction> t3 = new List<Transaction>();
            t3.AddRange(t1);
            t3.AddRange(t2);
            List<Transaction> t4 = t3.OrderByDescending(t => t.reference_id).Take(5).ToList();
            //List<Transaction> l = db.AccountHolders.Where(c => c.user_id == id).Select(c => c.Transactions).ToList();
            return t4;
        }

        #endregion


        [Route("api/getCustDetails")]
        public CustomerDetail GetCustomerDetails(int id)
        {
            CustomerDetail l = db.AccountHolders.Where(c => c.user_id == id).Select(c => c.CustomerDetail).ToList()[0];
            return l;
        }

        [Route("api/getCustAddress")]
        public IEnumerable<CustAddress> GetCustomerAddress(int id)
        {

            int? custid = db.AccountHolders.FirstOrDefault(c => c.user_id == id).cust_id;
            List<CustAddress> adr = db.CustAddresses.Where(c => c.cust_id == custid).ToList();
            return adr;
        }

        #endregion




        // GET: api/AccountHolders
        public IQueryable<AccountHolder> GetAccountHolders()
        {
            return db.AccountHolders;
        }

        // GET: api/AccountHolders/5
        [ResponseType(typeof(AccountHolder))]
        public IHttpActionResult GetAccountHolder(long id)
        {
            AccountHolder accountHolder = db.AccountHolders.Find(id);
            if (accountHolder == null)
            {
                return NotFound();
            }

            return Ok(accountHolder);
        }

        // PUT: api/AccountHolders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccountHolder(long id, AccountHolder accountHolder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accountHolder.account_number)
            {
                return BadRequest();
            }

            db.Entry(accountHolder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountHolderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AccountHolders
        [ResponseType(typeof(AccountHolder))]
        public IHttpActionResult PostAccountHolder(AccountHolder accountHolder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccountHolders.Add(accountHolder);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = accountHolder.account_number }, accountHolder);
        }

        // DELETE: api/AccountHolders/5
        [ResponseType(typeof(AccountHolder))]
        public IHttpActionResult DeleteAccountHolder(long id)
        {
            AccountHolder accountHolder = db.AccountHolders.Find(id);
            if (accountHolder == null)
            {
                return NotFound();
            }

            db.AccountHolders.Remove(accountHolder);
            db.SaveChanges();

            return Ok(accountHolder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccountHolderExists(long id)
        {
            return db.AccountHolders.Count(e => e.account_number == id) > 0;
        }
    }
}