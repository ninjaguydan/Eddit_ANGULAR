import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";
import {IPost} from "../../interfaces/IPost";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnDestroy {
	currentUser!:IUser|null
	postList!:Array<IPost>
	postListSUB:Subscription

	constructor(private dataService:DataService) {
		this.currentUser = dataService.currentUser
		this.postList = dataService.postList
		this.postListSUB = dataService.postList$.subscribe((newList) => this.postList = newList)
	}
	ngOnDestroy():void {
		this.postListSUB.unsubscribe()
	}

}
