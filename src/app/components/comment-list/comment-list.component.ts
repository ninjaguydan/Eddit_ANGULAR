import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";
import {IComment} from "../../interfaces/IComment";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-comment-list',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
	@Input() POST!:string
	commentList!:Array<IComment>
	commentListSUB:Subscription

	constructor(private dataService:DataService) {
		this.commentListSUB = dataService.commentList$.subscribe((newList) => {
			this.commentList = newList.filter((comment) => comment.post === this.POST)
		})
	}

	ngOnInit(): void {
		this.commentList = this.dataService.commentList.filter((comment) => comment.post === this.POST)
	}
	ngOnDestroy() {
		this.commentListSUB.unsubscribe()
	}

}
