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
    public class BeneficiariesController : ApiController
    {
        private BankingEntities db = new BankingEntities();


        #region Add Beneficiary
        [Route("api/beneficiary/{b_account_number}")]
        [HttpPost]
        public string GetBeneficiaryName(string b_account_number)
        {
            try
            {
                long b_acc = Convert.ToInt64(b_account_number);
                string name = db.AccountHolders.Where(c => c.account_number == b_acc).Select(c => c.CustomerDetail.first_name).FirstOrDefault();
                if (name == null)
                {
                    return "Incorrect Account number";
                }
                return name;
            }
            catch (Exception e)
            {
                while (e.InnerException != null) e = e.InnerException;
                return "Incorrect Account number";
            }

        }

        [Route("api/addbeneficiary/")]
        [HttpPost]
        public HttpResponseMessage AddBeneficiary(Beneficiary beneficiary)
        {
            try
            {
                if (beneficiary.b_account_number == beneficiary.account_number)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Same");
                }
                var exists = db.Beneficiaries.FirstOrDefault(b => b.account_number == beneficiary.account_number && b.b_account_number == beneficiary.b_account_number);

                if (exists == null)
                {
                    db.Beneficiaries.Add(beneficiary);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Okay");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Exists");
                }
            }
            catch (Exception e)
            {
                while (e.InnerException != null) e = e.InnerException;
                return Request.CreateResponse(HttpStatusCode.OK, e.Message);
            }
        }

        #endregion


        // GET: api/Beneficiaries
        public IQueryable<Beneficiary> GetBeneficiaries()
        {
            return db.Beneficiaries;
        }

        // GET: api/Beneficiaries/5
        [ResponseType(typeof(Beneficiary))]
        public IHttpActionResult GetBeneficiary(int id)
        {
            Beneficiary beneficiary = db.Beneficiaries.Find(id);
            if (beneficiary == null)
            {
                return NotFound();
            }

            return Ok(beneficiary);
        }

        // PUT: api/Beneficiaries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBeneficiary(int id, Beneficiary beneficiary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != beneficiary.beneficiary_id)
            {
                return BadRequest();
            }

            db.Entry(beneficiary).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeneficiaryExists(id))
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

        // POST: api/Beneficiaries
        [ResponseType(typeof(Beneficiary))]
        public IHttpActionResult PostBeneficiary(Beneficiary beneficiary)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Beneficiaries.Add(beneficiary);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = beneficiary.beneficiary_id }, beneficiary);
        }

        // DELETE: api/Beneficiaries/5
        [ResponseType(typeof(Beneficiary))]
        public IHttpActionResult DeleteBeneficiary(int id)
        {
            Beneficiary beneficiary = db.Beneficiaries.Find(id);
            if (beneficiary == null)
            {
                return NotFound();
            }

            db.Beneficiaries.Remove(beneficiary);
            db.SaveChanges();

            return Ok(beneficiary);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BeneficiaryExists(int id)
        {
            return db.Beneficiaries.Count(e => e.beneficiary_id == id) > 0;
        }
    }
}