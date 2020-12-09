create database Banking_Final
use Banking_Final

create table CustomerDetails(
cust_id int IDENTITY(1000,1) Primary key,
title varchar(5),
first_name varchar(20) not null,
middle_name varchar(20),
last_name varchar(20) not null,
fathers_name varchar(20),
gender varchar(20) not null,
mobile_number varchar(15) unique not null,
email varchar(100) unique,
aadhar bigint unique not null,
pan_card varchar(15) unique not null,
pan_doc varchar(max),
dob datetime not null check (datediff(year,dob,getdate())>18),
occupation_type varchar(50),
source_of_income varchar(50),
gross_annual_income varchar(50),
debit_card bit not null,
net_banking bit not null,
approval_status varchar(20) not null
)

create table CustAddress(
cust_id int references CustomerDetails(cust_id),
type_of_address varchar(10) not null,
line1 varchar(75),
line2 varchar(75),
landmark varchar(75),
city varchar(25) not null,
cust_state varchar(25) not null,
pin_code int not null ,
primary key(cust_id,type_of_address)
)

create table BankAdmin(
admin_id int primary key,
admin_password varchar(100)not null
)

create table Approval(
approval_id int IDENTITY(1,1) Primary key,
cust_id int references CustomerDetails(cust_id) unique,
srn int unique not null,
alloted_to int references BankAdmin(admin_id)
)

create table AccountHolder(
account_number bigint IDENTITY(51000000000,1) primary key,
user_id int not null,
cust_id int references CustomerDetails(cust_id),
login_password varchar(25) not null,
transaction_password varchar(25),
created_on datetime,
last_login datetime,
account_status varchar(20)
) 

create table AccountDetails(
account_number bigint references AccountHolder(account_number) primary key,
account_type varchar(20) not null,
current_balance decimal(10,3) not null ,
check(current_balance>=500.000)
)

create table Beneficiaries(
beneficiary_id int IDENTITY(100,1) primary key,
account_number bigint references AccountHolder(account_number) not null,
b_account_number bigint references AccountHolder(account_number) not null,
nickname varchar(20),
unique(account_number,b_account_number)
)

create table Transactions(
reference_id int IDENTITY(10000,1) primary key,
mode varchar(5) not null,
paid_to_acc_num bigint references AccountHolder(account_number) not null,
from_acc_num bigint references AccountHolder(account_number) not null,
amount decimal(10,3) not null,
tax decimal(10,3) not null,
trans_time datetime not null,
tran_status varchar(15) not null,
remark varchar(100)
)

select* from BankAdmin
select* from CustomerDetails
select* from CustAddress
select * from AccountHolder

--Bank Admin
INSERT INTO [dbo].[BankAdmin]
           ([admin_id]
           ,[admin_password])
     VALUES
           (10672090
           ,'Password@123'),
		   (10672111
           ,'Adith@123'),
		   (10672240
           ,'Password@123'),
		   (10672513
           ,'Password@123')

--Customer Details

INSERT INTO [dbo].[CustomerDetails]
           ([title]
           ,[first_name]
           ,[middle_name]
           ,[last_name]
           ,[fathers_name]
		   ,[gender]
           ,[mobile_number]
           ,[email]
           ,[aadhar]
           ,[pan_card]
           ,[pan_doc]
           ,[dob]
           ,[occupation_type]
           ,[source_of_income]
           ,[gross_annual_income]
           ,[debit_card]
           ,[net_banking]
           ,[approval_status])
     VALUES
           ('Ms'
           ,'Olivia'
           ,'Tulsi'
           ,'Biswas'
           ,'Bidyut'
		   ,'Female'
           ,'9769487530'
           ,'27oliviabiswas@gmail.com'
           ,'156121686'
           ,'hjbshbcs'
           ,'abc.pdf'
           ,'1998-03-27'
           ,'Student'
           ,'Private'
           ,'5 LPA'
           ,1
           ,1
           ,'Approved'),
		   ('Mr'
           ,'Adith'
           ,'Manohar'
           ,'Shetty'
           ,'Manohar'
		   ,'Male'
           ,'8169997094'
           ,'adith.general@gmail.com'
           ,'156921686'
           ,'hjbs9bcs'
           ,'adith.pdf'
           ,'1998-08-09'
           ,'Student'
           ,'Private'
           ,'5 LPA'
           ,0
           ,1
           ,'Approved'),

		   ('Ms'
           ,'Shefali'
           ,'Sudhakar'
           ,'Shetty'
           ,'Sudhakar'
		   ,'Female'
           ,'8108573510'
           ,'shefalishetty2020@gmail.com'
           ,'156921656'
           ,'hjbsh7cs'
           ,'shefali.pdf'
           ,'1998-03-25'
           ,'Student'
           ,'Government'
           ,'5 LPA'
           ,1
           ,1
           ,'Pending'),

		   ('Mr'
           ,'Dhruv'
           ,'Ghanshyam'
           ,'Vyas'
           ,'Ghanshyam'
		   ,'Male'
           ,'9819863171'
           ,'dhruv.vyas.98@gmail.com'
           ,'156121699'
           ,'hjbshb09'
           ,'dhruv.pdf'
           ,'1998-11-22'
           ,'Student'
           ,'Service'
           ,'10 LPA'
           ,0
           ,1
           ,'Pending')

--Cust Address

INSERT INTO [dbo].[CustAddress]
           ([cust_id]
           ,[type_of_address]
           ,[line1]
           ,[line2]
           ,[landmark]
           ,[city]
           ,[cust_state]
           ,[pin_code])
     VALUES
           (1000
           ,'Same'
           ,304
           ,'hjbhmbjh'
           ,'hbdhsbc'
           ,'Mumbai'
           ,'Maharashtra'
           ,410206),

		   (1001
           ,'Resident'
           ,304
           ,'hjbhmbjh'
           ,'hbdhsbc'
           ,'Mumbai'
           ,'Maharashtra'
           ,410206),

		   (1001
           ,'Permanent'
           ,304
           ,'hjbhmbjh'
           ,'hbdhsbc'
           ,'Mumbai'
           ,'Maharashtra'
           ,410206),

		   (1002
           ,'Same'
           ,304
           ,'hjbhmbjh'
           ,'hbdhsbc'
           ,'Mumbai'
           ,'Maharashtra'
           ,410206),

		   (1003
           ,'Same'
           ,304
           ,'hjbhmbjh'
           ,'hbdhsbc'
           ,'Mumbai'
           ,'Maharashtra'
           ,410206)

--Account Holder

INSERT INTO [dbo].[AccountHolder]
           ([user_id]
           ,[cust_id]
           ,[login_password]
           ,[transaction_password]
           ,[created_on]
           ,[last_login]
           ,[account_status])
     VALUES
           (1233215
           ,1001
           ,'adith@123'
           ,null
           ,'2020-12-03'
           ,null
           ,'unlocked'),
		   (1233216
           ,1000
           ,'olivia@123'
           ,null
           ,'2020-12-03'
           ,null
           ,'unlocked')

--Approval

INSERT INTO [dbo].[Approval]
           ([cust_id]
           ,[srn]
           ,[alloted_to])
     VALUES
           (1002
           ,7654321
           ,10672240),
		   (1003
           ,7654322
           ,null)


select* from BankAdmin
select* from CustomerDetails
select* from CustAddress
select * from AccountHolder
select* from Approval



