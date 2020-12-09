using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Banking_Case_Study.Models;

namespace Banking_Case_Study.Controllers
{
    public class OTPController : ApiController
    {
        private BankingEntities db = new BankingEntities();
        private readonly string accountSid = "AC15aa28395763ae1eb0cc8348a31866d0";
        private readonly string authToken = "efb2bd7e97a943f2dd0eb1be3b196436";
        private static readonly Dictionary<string, string> otp = new Dictionary<string, string>();

        #region Generate OTP
        private static string GenerateRandomOTP(string key)

        {
            Random rnd = new Random();
            if (otp.ContainsKey(key))
            {
                otp[key] = (rnd.Next(100000, 999999)).ToString();
            }
            else
            {
                otp.Add(key, (rnd.Next(100000, 999999)).ToString());
            }
            return otp[key];
        }

        #endregion

        #region Send OTP
        [Route("api/sendOtp")]
        [HttpPost]
        public IHttpActionResult SendOTP(string type, string required_detail)
        {
            MessageResource message;
            TwilioClient.Init(accountSid, authToken);
            //string mobile_num = "+918169997094";
            string mobile;
            int user_id;

            switch (type)
            {
                case "user_id":
                    long account_number = Convert.ToInt64(required_detail);
                    var account_Exists = db.AccountHolders.Where(a => a.account_number == account_number).ToList();
                    if (account_Exists.Count == 0)
                    {
                        return Ok("Does Not Exist");
                    }
                    else
                    {
                        mobile = db.AccountHolders.Where(a => a.account_number == account_number).Select(a => a.CustomerDetail.mobile_number).ToList()[0];
                        message = MessageResource.Create(
                        body: "Forgot User Id. Your Otp: " + GenerateRandomOTP(required_detail),
                        from: new Twilio.Types.PhoneNumber("+17205719916"),
                        to: new Twilio.Types.PhoneNumber("+91" + mobile)
                    );
                    }

                    break;
                case "login_password":
                    user_id = Convert.ToInt32(required_detail);
                    var cust_id = db.AccountHolders.Where(a => a.user_id == user_id).ToList();

                    if (cust_id.Count == 0)
                    {
                        return Ok("Does Not Exist");
                    }
                    else
                    {
                        mobile = db.AccountHolders.Where(a => a.user_id == user_id).Select(a => a.CustomerDetail.mobile_number).ToList()[0];
                        message = MessageResource.Create(
                            body: "Forgot Login password for UserId " + cust_id.ElementAt(0).user_id + ". Your Otp: " + GenerateRandomOTP(required_detail),
                            from: new Twilio.Types.PhoneNumber("+17205719916"),
                            to: new Twilio.Types.PhoneNumber("+91" + mobile)
                        );
                    }

                    break;
                case "transaction_password":
                    user_id = Convert.ToInt32(required_detail);
                    var cust = db.AccountHolders.Where(a => a.user_id == user_id).ToList();
                    if (cust.Count == 0)
                    {
                        return Ok("Does Not Exist");
                    }
                    mobile = db.AccountHolders.Where(a => a.user_id == user_id).Select(a => a.CustomerDetail.mobile_number).ToList()[0];
                    message = MessageResource.Create(
                        body: "Forgot Transaction password Otp:" + GenerateRandomOTP(required_detail),
                        from: new Twilio.Types.PhoneNumber("+17205719916"),
                        to: new Twilio.Types.PhoneNumber("+91" + mobile)
                    );
                    break;
                default:
                    return Ok("Wrong Request");
            }

            return Ok(message.Sid);
        }

        #endregion

        #region Check OTP
        [Route("api/sendUserId")]
        [HttpPost]
        public IHttpActionResult SendUserId(string account_number)
        {
            MessageResource message;
            TwilioClient.Init(accountSid, authToken);
            //string mobile_num = "+918169997094";

            long acc_num = Convert.ToInt64(account_number);
            int user_id = db.AccountHolders.First(a => a.account_number == acc_num).user_id;
            string name = db.AccountHolders.First(a => a.account_number == acc_num).CustomerDetail.first_name;
            string mobile = db.AccountHolders.Where(a => a.account_number == acc_num).Select(a => a.CustomerDetail.mobile_number).ToList()[0];

            message = MessageResource.Create(
            body: "Hii " + name + ", This is your User Id: " + user_id,
            from: new Twilio.Types.PhoneNumber("+17205719916"),
            to: new Twilio.Types.PhoneNumber("+91" + mobile));

            return Ok("Message Sent");
        }



        [Route("api/checkOtp")]
        [HttpPost]
        public IHttpActionResult CheckOTP(string receivedOTP, string required_detail)
        {
            if (receivedOTP == otp[required_detail])
            {
                otp.Remove(required_detail);
                return Ok("Successful");
            }
            else
            {
                return Ok("OTP does not match");
            }
        }
        #endregion

    }
}
