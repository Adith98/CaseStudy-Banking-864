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
    public class AccountDetailsController : ApiController
    {
        private BankingEntities db = new BankingEntities();

        // GET: api/AccountDetails
        public IQueryable<AccountDetail> GetAccountDetails()
        {
            return db.AccountDetails;
        }

        // GET: api/AccountDetails/5
        [ResponseType(typeof(AccountDetail))]
        public IHttpActionResult GetAccountDetail(long id)
        {
            AccountDetail accountDetail = db.AccountDetails.Find(id);
            if (accountDetail == null)
            {
                return NotFound();
            }

            return Ok(accountDetail);
        }

        // PUT: api/AccountDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccountDetail(long id, AccountDetail accountDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accountDetail.account_number)
            {
                return BadRequest();
            }

            db.Entry(accountDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountDetailExists(id))
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

        // POST: api/AccountDetails
        [ResponseType(typeof(AccountDetail))]
        public IHttpActionResult PostAccountDetail(AccountDetail accountDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AccountDetails.Add(accountDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AccountDetailExists(accountDetail.account_number))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = accountDetail.account_number }, accountDetail);
        }

        // DELETE: api/AccountDetails/5
        [ResponseType(typeof(AccountDetail))]
        public IHttpActionResult DeleteAccountDetail(long id)
        {
            AccountDetail accountDetail = db.AccountDetails.Find(id);
            if (accountDetail == null)
            {
                return NotFound();
            }

            db.AccountDetails.Remove(accountDetail);
            db.SaveChanges();

            return Ok(accountDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccountDetailExists(long id)
        {
            return db.AccountDetails.Count(e => e.account_number == id) > 0;
        }
    }
}