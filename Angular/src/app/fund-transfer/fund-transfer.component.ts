import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  userid: number = +sessionStorage.getItem("userid");
  constructor() { }

  ngOnInit(): void {
  }

}
