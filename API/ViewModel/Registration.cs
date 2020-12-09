using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Banking_Case_Study.ViewModel
{
    public class Registration
    {
        public string title { get; set; }
        public string first_name { get; set; }
        public string middle_name { get; set; }
        public string last_name { get; set; }
        public string fathers_name { get; set; } 
        public string mobile_number { get; set; }
        public string email { get; set; }
        public long aadhar { get; set; }
        public string pan_card { get; set; }
        public string pan_doc { get; set; }
        public System.DateTime dob { get; set; }
        public string occupation_type { get; set; }
        public string source_of_income { get; set; }
        public string gross_annual_income { get; set; }
        public bool debit_card { get; set; }
        public bool net_banking { get; set; }
        public string approval_status { get; set; }

        public int cust_id { get; set; }
        public string type_of_address { get; set; }
        public string line1 { get; set; }
        public string line2 { get; set; }
        public string landmark { get; set; }
        public string city { get; set; }
        public string cust_state { get; set; }
        public int pin_code { get; set; }

        public string line1_residential { get; set; }
        public string line2_residential { get; set; }
        public string landmark_residential { get; set; }
        public string city_residential { get; set; }
        public string cust_state_residential { get; set; }
        public int pin_code_residential { get; set; }
    }
}