using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Banking_Case_Study.Models;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Banking_Case_Study.Controllers
{
    public class AdminController : ApiController
    {
        readonly BankingEntities db = new BankingEntities();
        private readonly string accountSid = "AC15aa28395763ae1eb0cc8348a31866d0";
        private readonly string authToken = "efb2bd7e97a943f2dd0eb1be3b196436";

        private readonly Random _random = new Random();
        public string RandomString(int size, bool lowerCase = false)
        {
            var builder = new StringBuilder(size);
            char offset = lowerCase ? 'a' : 'A';
            const int lettersOffset = 26;

            for (var i = 0; i < size; i++)
            {
                var @char = (char)_random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }

            return lowerCase ? builder.ToString().ToLower() : builder.ToString();
        }
        public int RandomNumber(int min, int max)
        {
            return _random.Next(min, max);
        }


        #region Admin Dashboard

        #region AdminLogin
        [Route("api/Login")]
        [HttpPost]
        public HttpResponseMessage PostLogin(int admin_id, string password)
        {
            bool Exists = false;
            BankAdmin admin = new BankAdmin();
            List<BankAdmin> admins = db.BankAdmins.ToList();
            foreach (var item in admins)
            {
                if (item.admin_id == admin_id)
                {
                    Exists = true;
                    admin = item;
                    break;
                }
            }

            if (Exists)
            {
                if (admin.admin_password == password)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Success");
                }
                else return Request.CreateResponse(HttpStatusCode.OK, "Wrong Password");
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid Admin Id");
            }
        }
        #endregion

        #region Allotted To Admin
        [Route("api/alloted/{admin_id}")]
        [HttpGet]
        public IEnumerable<CustomerDetail> GetAllotedToAdmin(string admin_id)
        {
            int admin = Convert.ToInt32(admin_id);
            List<CustomerDetail> allottedlist = db.Approvals.Where(c => c.alloted_to == admin && c.CustomerDetail.approval_status == "Pending").Select(c => c.CustomerDetail).ToList();
            return allottedlist;
        }
        #endregion

        #region Pending List
        [Route("api/pending")]
        [HttpGet]
        public IEnumerable<CustomerDetail> GetPendingCustomers()
        {
            //List<CustomerDetail> pendinglist = db.CustomerDetails.Where(c => c.approval_status == "pending").ToList();
            List<CustomerDetail> pendinglist = db.Approvals.Where(c => c.alloted_to == null && c.CustomerDetail.approval_status == "Pending").Select(c => c.CustomerDetail).ToList();
            return pendinglist;
        }
        #endregion

        #region Allot To Me Button
        [Route("api/allot_to_me")]
        public void Put(string allotted_to, int cust_id, [FromBody] Approval approval)
        {
            int admin_allot = Convert.ToInt32(allotted_to);
            approval = (from p in db.Approvals
                        where p.cust_id == cust_id
                        select p).SingleOrDefault();
            approval.alloted_to = admin_allot;
            db.SaveChanges();
        }
        #endregion

        #region Approve Details
        [Route("api/approve")]
        [HttpPut]
        public IHttpActionResult Put(int id, string message, [FromBody] CustomerDetail customerdetail)
        {
            try
            {
                customerdetail = (from p in db.CustomerDetails
                                  where p.cust_id == id
                                  select p).SingleOrDefault();
                customerdetail.approval_status = message;
                db.SaveChanges();
                if (message == "Approved")
                {
                    int user_id = _random.Next(10000, 990000);
                    var passwordBuilder = new StringBuilder();
                    passwordBuilder.Append(RandomString(4, true));
                    passwordBuilder.Append(RandomNumber(1000, 9999));
                    passwordBuilder.Append(RandomString(2));
                    string log_password = passwordBuilder.ToString();

                    byte[] encDataLogin_byte = new byte[log_password.Length];
                    encDataLogin_byte = System.Text.Encoding.UTF8.GetBytes(log_password);
                    string encodedLoginpassword = Convert.ToBase64String(encDataLogin_byte);

                    DateTime created_on = DateTime.Now;
                    AccountHolder ac = new AccountHolder
                    {
                        user_id = user_id,
                        cust_id = id,
                        login_password = encodedLoginpassword,
                        transaction_password = null,
                        created_on = created_on,
                        last_login = null,
                        account_status = "0"
                    };
                    db.AccountHolders.Add(ac);
                    double account_num = ac.account_number;
                    db.SaveChanges();
                    AccountDetail ad = new AccountDetail
                    {
                        account_number = ac.account_number,
                        account_type = "Savings",
                        current_balance = 25000
                    };
                    db.AccountDetails.Add(ad);
                    db.SaveChanges();

                    MessageResource message1;
                    TwilioClient.Init(accountSid, authToken);

                    string mobile = db.CustomerDetails.First(c => c.cust_id == id).mobile_number;
                    message1 = MessageResource.Create(
                    body: "Your Account Details. Account Number: " + ac.account_number + "  User ID: " + ac.user_id + "First Time Login Password: " + log_password,
                    from: new Twilio.Types.PhoneNumber("+17205719916"),
                    to: new Twilio.Types.PhoneNumber("+91" + mobile));
                }

                return Ok("Done");
            }
            catch (Exception e)
            {
                while (e.InnerException != null) e = e.InnerException;
                return Ok(new { message = "Exception", exception_message = e.Message });
            }

        }

        #endregion

        #endregion



        #region View Customer Detail
        [Route("api/getCust")]
        public IEnumerable<CustomerDetail> GetCustomerToBeApproved(string cust_id)
        {
            int cust = Convert.ToInt32(cust_id);
            List<CustomerDetail> l = db.CustomerDetails.Where(c => c.cust_id == cust).ToList();
            return l;
        }


        [Route("api/getAdd")]
        public IEnumerable<CustAddress> GetCustomerAddressToBeApproved(string cust_id)
        {
            int cust = Convert.ToInt32(cust_id);
            List<CustAddress> li = db.CustAddresses.Where(c => c.cust_id == cust).ToList();
            return li;
        }
        #endregion





    }
}
