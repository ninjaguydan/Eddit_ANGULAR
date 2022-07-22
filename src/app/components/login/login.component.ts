import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username:string = 'admin00'
	password:string = 'pass'
	error:string|void = ''

	constructor(private dataService:DataService) { }

	ngOnInit(): void {
	}

	login():void{
		this.error = this.dataService.LOGIN(this.username, this.password)
	}

}
