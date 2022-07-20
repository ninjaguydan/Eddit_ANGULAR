import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	name:string = ''
	username:string = ''
	password:string = ''
	confirm:string = ''
	hasErrors:{name:string|undefined,username:string|undefined,password:string|undefined,confirm:string|undefined} = {
		name: '',
		username: '',
		password: '',
		confirm: ''
	}
	valid:boolean = Object.keys(this.hasErrors).length === 0
	error!:string|void

	constructor(private dataService:DataService) { }

	ngOnInit(): void {
	}
	onNameChange(value:string):void {
		this.name = value
		if (!value || value.length < 2) {
			this.hasErrors["name"] = "Name must be at least 2 characters"
		} else if ( value.length > 20 ) {
			this.hasErrors["name"] = "Name can't be more than 20 characters"
		} else {
			delete this.hasErrors["name"]
		}
		this.valid = Object.keys(this.hasErrors).length === 0
	}
	onUsernameChange(value:string):void {
		this.username = value
		if (!value || value.length < 3) {
			this.hasErrors["username"] = "Username must be at least 3 characters"
		} else {
			delete this.hasErrors["username"]
		}
		this.valid = Object.keys(this.hasErrors).length === 0
	}
	onPwChange(value:string):void {
		this.password = value
		if (!value || value.length < 4) {
			this.hasErrors["password"] = "Password must be at least 4 characters"
		} else {
			delete this.hasErrors["password"]
		}
		this.onConfirmChange(this.confirm)
		this.valid = Object.keys(this.hasErrors).length === 0
	}
	onConfirmChange(value:string):void {
		this.confirm = value
		if (!value || value !== this.password) {
			this.hasErrors["confirm"] = "Password don't match"
		} else {
			delete this.hasErrors["confirm"]
		}
		this.valid = Object.keys(this.hasErrors).length === 0
	}

	register() {
		this.error = this.dataService.CREATE_USER(this.name, this.username,this.password)
	}
}
