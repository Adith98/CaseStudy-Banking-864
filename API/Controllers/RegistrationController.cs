using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Banking_Case_Study.ViewModel;
using Banking_Case_Study.Models;
using System.Data.Entity;

namespace Banking_Case_Study.Controllers
{
    public class RegistrationController : ApiController
    {
        BankingEntities db = new BankingEntities();

        #region Registration

        [Route("api/Register")]
        [HttpPost]
        public IHttpActionResult Register(Registration registration)
        {
            CustomerDetail customer = new CustomerDetail
            {
                title = registration.title,
                first_name = registration.first_name,
                middle_name = registration.middle_name,
                last_name = registration.last_name,
                fathers_name = registration.fathers_name,
                mobile_number = registration.mobile_number,
                email = registration.email,
                aadhar = registration.aadhar,
                pan_card = registration.pan_card,
                pan_doc = registration.pan_doc,
                dob = registration.dob,
                occupation_type = registration.occupation_type,
                source_of_income = registration.source_of_income,
                gross_annual_income = registration.gross_annual_income,
                debit_card = registration.debit_card,
                net_banking = registration.net_banking,
                approval_status = registration.approval_status
            };
            db.CustomerDetails.Add(customer);
            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                while (e.InnerException != null) e = e.InnerException;
                return Ok(new { message = "Exception", exception_message = e.Message });
            }

            registration.cust_id = db.CustomerDetails.FirstOrDefault(c => c.mobile_number == registration.mobile_number).cust_id;


            if (registration.type_of_address == "Yes")
            {
                db.CustAddresses.Add(new CustAddress
                {
                    cust_id = registration.cust_id,
                    type_of_address = "same",
                    line1 = registration.line1,
                    line2 = registration.line2,
                    landmark = registration.landmark,
                    city = registration.city,
                    cust_state = registration.cust_state,
                    pin_code = registration.pin_code
                });
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Ok(new { message = "Exception", exception_message = e.Message });
                }
            }
            else
            {
                db.CustAddresses.Add(new CustAddress
                {
                    cust_id = registration.cust_id,
                    type_of_address = "Permanent",
                    line1 = registration.line1,
                    line2 = registration.line2,
                    landmark = registration.landmark,
                    city = registration.city,
                    cust_state = registration.cust_state,
                    pin_code = registration.pin_code
                });
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Ok(new { message = "Exception", exception_message = e.Message });
                }
                db.CustAddresses.Add(new CustAddress
                {
                    cust_id = registration.cust_id,
                    type_of_address = "Resident",
                    line1 = registration.line1_residential,
                    line2 = registration.line2_residential,
                    landmark = registration.landmark_residential,
                    city = registration.city_residential,
                    cust_state = registration.cust_state_residential,
                    pin_code = registration.pin_code_residential
                });
                try
                {
                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    return Ok(new { message = "Exception", exception_message = e.Message });
                }

            }

            return Ok(new { message = "Okay", customer.cust_id });

        }


        #endregion

        #region GetStatus
        [Route("api/getstatus/")]
        public IHttpActionResult GetStat(int srn)
        {
            List<CustomerDetail> l = db.Approvals.Where(s => s.srn == srn).Select(c => c.CustomerDetail).ToList();
            if (l.Count == 0)
            {
                return Ok("Does Not Exist");
            }
            else
            {
                return Ok(l[0].approval_status);
            }
        }
        #endregion

        #region Add Approval Row
        [Route("api/AddApproval")]
        [HttpPost]
        public IHttpActionResult PostApproval(Approval approval)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Approvals.Add(approval);
            db.SaveChanges();

            return Ok(new { message = "Okay", approval.srn });
        }
        #endregion

        #region Update Cust Details
        [Route("api/UpdateCustDetail")]
        [HttpPut]
        public IHttpActionResult UpdateCustDetail(int user_id, Registration registration)
        {


            try
            {
                CustomerDetail customer = new CustomerDetail
                {
                    cust_id = registration.cust_id,
                    title = registration.title,
                    first_name = registration.first_name,
                    middle_name = registration.middle_name,
                    last_name = registration.last_name,
                    fathers_name = registration.fathers_name,
                    mobile_number = registration.mobile_number,
                    email = registration.email,
                    aadhar = registration.aadhar,
                    pan_card = registration.pan_card,
                    pan_doc = registration.pan_doc,
                    dob = registration.dob,
                    occupation_type = registration.occupation_type,
                    source_of_income = registration.source_of_income,
                    gross_annual_income = registration.gross_annual_income,
                    debit_card = registration.debit_card,
                    net_banking = registration.net_banking,
                    approval_status = registration.approval_status
                };

                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();


                if (registration.type_of_address == "Yes")
                {
                    CustAddress addr = new CustAddress
                    {
                        cust_id = registration.cust_id,
                        type_of_address = "same",
                        line1 = registration.line1,
                        line2 = registration.line2,
                        landmark = registration.landmark,
                        city = registration.city,
                        cust_state = registration.cust_state,
                        pin_code = registration.pin_code
                    };
                    db.Entry(addr).State = EntityState.Modified;
                    db.SaveChanges();
                }
                else
                {
                    CustAddress addr = new CustAddress
                    {
                        cust_id = registration.cust_id,
                        type_of_address = "Permanent",
                        line1 = registration.line1,
                        line2 = registration.line2,
                        landmark = registration.landmark,
                        city = registration.city,
                        cust_state = registration.cust_state,
                        pin_code = registration.pin_code
                    };
                    db.Entry(addr).State = EntityState.Modified;
                    db.SaveChanges();

                    CustAddress addr2 = new CustAddress
                    {
                        cust_id = registration.cust_id,
                        type_of_address = "Resident",
                        line1 = registration.line1_residential,
                        line2 = registration.line2_residential,
                        landmark = registration.landmark_residential,
                        city = registration.city_residential,
                        cust_state = registration.cust_state_residential,
                        pin_code = registration.pin_code_residential
                    };
                    db.Entry(addr2).State = EntityState.Modified;
                    db.SaveChanges();

                }
                return Ok(new { message = "Okay", customer.cust_id });
            }
            catch (Exception e)
            {
                while (e.InnerException != null) e = e.InnerException;
                return Ok(new { message = "Exception", exception_message = e.Message });
            }


        }

        #endregion

    }
}
