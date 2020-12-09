import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionServices } from '../service/transaction';

@Component({
  selector: 'app-transaction-receipt',
  templateUrl: './transaction-receipt.component.html',
  styleUrls: ['./transaction-receipt.component.css']
})
export class TransactionReceiptComponent implements OnInit {

  ref_id:string
  reference_id:number
  transaction_receipt:any={}

  constructor(private route:ActivatedRoute,private service:TransactionServices) { }

  getTrans(reference_id:number){
    debugger
    this.service.getTransactionReceipt(reference_id).subscribe(
      data=>{
        console.log(data)
        this.transaction_receipt=data;
      }
    )
  }



  ngOnInit(): void {
    debugger
    this.route.paramMap.subscribe(params => { 
      this.ref_id = params.get('reference_id'); 
      this.reference_id = + this.ref_id
    });

    this.getTrans(this.reference_id)
  }

}
