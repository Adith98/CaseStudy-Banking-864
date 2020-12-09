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

namespace Banking_Case_Study.Controllers
{
    public class TransactionsController : ApiController
    {
        private BankingEntities db = new BankingEntities();


        #region Fund Transfer

        #region Get Beneficiaries (For Dropdown)
        [Route("api/Transactions/getBeneficiaries")]
        [HttpPost]
        public List<long> GetBeneficiaries(long account_number)
        {
            List<long> Beneficiaries = db.Beneficiaries.Where(b => b.account_number == account_number).Select(b => b.b_account_number).ToList();

            return Beneficiaries;
        }
        #endregion


        [Route("api/UpdateCurrentBalance")]
        [HttpPut]
        public IHttpActionResult UpdateBalance(long from_account_number, long to_account_number, int debit, [FromBody] AccountDetail accountDetail)
        {
            accountDetail = (from p in db.AccountDetails
                             where p.account_number == from_account_number
                             select p).SingleOrDefault();
            accountDetail.current_balance -= debit;
            decimal balance = accountDetail.current_balance;
            accountDetail = (from p in db.AccountDetails
                             where p.account_number == to_account_number
                             select p).SingleOrDefault();
            accountDetail.current_balance += debit;
            db.SaveChanges();
            return Ok(balance);
        }


        [Route("api/CheckTransactionPassword")]
        [HttpPost]
        public IHttpActionResult CheckTransactionPassword(long account_number, string transaction_password)
        {
            try
            {
                string password = db.AccountHolders.Where(a => a.account_number == account_number).Select(a => a.transaction_password).ToList()[0];

                System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
                System.Text.Decoder utf8Decode = encoder.GetDecoder();
                byte[] todecode_byte = Convert.FromBase64String(password);
                int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
                char[] decoded_char = new char[charCount];
                utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
                string decrypt_transaction_password = new String(decoded_char);


                if (decrypt_transaction_password == transaction_password)
                {
                    return Ok("Passwords Match");
                }
                else
                {
                    return Ok("Error");
                }
            }
            catch(Exception e)
            {
                return Ok("Error");
            }

        }

        //Add Transaction
        // POST: api/Transactions
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult PostTransaction(Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Transactions.Add(transaction);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = transaction.reference_id }, transaction);
        }

        #endregion



        // GET: api/Transactions
        public IQueryable<Transaction> GetTransactions()
        {
            return db.Transactions;
        }

        // GET: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult GetTransaction(int id)
        {
            Transaction transaction = db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // PUT: api/Transactions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransaction(int id, Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transaction.reference_id)
            {
                return BadRequest();
            }

            db.Entry(transaction).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // DELETE: api/Transactions/5
        [ResponseType(typeof(Transaction))]
        public IHttpActionResult DeleteTransaction(int id)
        {
            Transaction transaction = db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            db.Transactions.Remove(transaction);
            db.SaveChanges();

            return Ok(transaction);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransactionExists(int id)
        {
            return db.Transactions.Count(e => e.reference_id == id) > 0;
        }
    }
}