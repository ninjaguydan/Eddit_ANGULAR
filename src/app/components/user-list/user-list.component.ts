import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {DataService} from "../../services/data.service";

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
	currentUser!:IUser
	userList:Array<IUser> = []
	@Output() OPEN_MESSAGE:EventEmitter<string> = new EventEmitter<string>()

	constructor(private dataService:DataService) {
		this.currentUser = dataService.currentUser!
		this.userList = dataService.userList.sort((a,b) => a.username.localeCompare(b.username))
	}
	onClick(userId:string){
		this.OPEN_MESSAGE.emit(userId)
	}

}
