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
    public class CustAddressesController : ApiController
    {
        private BankingEntities db = new BankingEntities();

        // GET: api/CustAddresses
        public IQueryable<CustAddress> GetCustAddresses()
        {
            return db.CustAddresses;
        }

        // GET: api/CustAddresses/5
        [ResponseType(typeof(CustAddress))]
        public IHttpActionResult GetCustAddress(int id,string type)
        {
            CustAddress custAddress = db.CustAddresses.Find(id,type);
            if (custAddress == null)
            {
                return NotFound();
            }

            return Ok(custAddress);
        }

        // PUT: api/CustAddresses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustAddress(int id, CustAddress custAddress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != custAddress.cust_id)
            {
                return BadRequest();
            }

            db.Entry(custAddress).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustAddressExists(id))
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

        // POST: api/CustAddresses
        [ResponseType(typeof(CustAddress))]
        public IHttpActionResult PostCustAddress(CustAddress custAddress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustAddresses.Add(custAddress);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CustAddressExists(custAddress.cust_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = custAddress.cust_id }, custAddress);
        }

        // DELETE: api/CustAddresses/5
        [ResponseType(typeof(CustAddress))]
        public IHttpActionResult DeleteCustAddress(int id, string type)
        {
            CustAddress custAddress = db.CustAddresses.Find(id,type);
            if (custAddress == null)
            {
                return NotFound();
            }

            db.CustAddresses.Remove(custAddress);
            db.SaveChanges();

            return Ok(custAddress);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustAddressExists(int id)
        {
            return db.CustAddresses.Count(e => e.cust_id == id) > 0;
        }
    }
}