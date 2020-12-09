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
    public class ApprovalsController : ApiController
    {
        private BankingEntities db = new BankingEntities();

        // GET: api/Approvals
        public IQueryable<Approval> GetApprovals()
        {
            return db.Approvals;
        }

        // GET: api/Approvals/5
        [ResponseType(typeof(Approval))]
        public IHttpActionResult GetApproval(int id)
        {
            Approval approval = db.Approvals.Find(id);
            if (approval == null)
            {
                return NotFound();
            }

            return Ok(approval);
        }

        // PUT: api/Approvals/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutApproval(int id, Approval approval)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != approval.approval_id)
            {
                return BadRequest();
            }

            db.Entry(approval).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprovalExists(id))
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

        

        // DELETE: api/Approvals/5
        [ResponseType(typeof(Approval))]
        public IHttpActionResult DeleteApproval(int id)
        {
            Approval approval = db.Approvals.Find(id);
            if (approval == null)
            {
                return NotFound();
            }

            db.Approvals.Remove(approval);
            db.SaveChanges();

            return Ok(approval);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApprovalExists(int id)
        {
            return db.Approvals.Count(e => e.approval_id == id) > 0;
        }
    }
}