import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
	currentUser!:IUser|null
	currentUserSUB:Subscription
	@Output() ON_MESSAGE:EventEmitter<void> = new EventEmitter()

	constructor(private dataService:DataService) {
		this.currentUserSUB = dataService.currentUser$.subscribe((nextUser) => this.currentUser = nextUser)
	}
	ngOnDestroy() {
		this.currentUserSUB.unsubscribe()
	}
	logout(){
		this.dataService.LOGOUT()
	}
	onMessage() {
		this.ON_MESSAGE.emit()
	}

}
