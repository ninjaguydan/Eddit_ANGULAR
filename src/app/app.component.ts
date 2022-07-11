import {Component, OnDestroy} from '@angular/core';
import {DataService} from "./services/data.service";
import {IUser} from "./interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
	currentUser!:IUser|null
	currentUserSUB:Subscription
	messageFor!:string
	msgBoxVisible:boolean = false
	inboxVisible:boolean = false

	constructor(private dataService:DataService) {
		this.currentUserSUB = dataService.currentUser$.subscribe((nextUser) => this.currentUser = nextUser)
	}
	ngOnDestroy():void {
		this.currentUserSUB.unsubscribe()
	}
	openMessage(userId:string){
		this.messageFor = userId
		this.msgBoxVisible = true
	}
	closeMessage(){
		this.msgBoxVisible = false
	}
	toggleInbox(){
		this.inboxVisible = !this.inboxVisible
	}

}
