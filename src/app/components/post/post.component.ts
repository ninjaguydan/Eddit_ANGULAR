import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPost} from "../../interfaces/IPost";
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
	@Input() POST!:IPost
	user!:IUser
	currentUser!:boolean
	commentListSUB:Subscription
	commentsVisible:boolean = false
	count:number = 0

	constructor(private dataService:DataService) {
		this.commentListSUB = dataService.commentList$.subscribe((newList) => {
			this.count = newList.filter((comment) => comment.post === this.POST.id).length
		})
	}
	ngOnInit(): void {
		this.count = this.dataService.commentList.filter((comment) => comment.post === this.POST.id).length
		this.user = this.dataService.userList.find((user) => user.id === this.POST.user)!
		this.currentUser = this.dataService.currentUser!.id === this.user.id
	}
	ngOnDestroy():void {
		this.commentListSUB.unsubscribe()
	}
	onDelete():void{
		this.dataService.DELETE_POST(this.POST.id)
	}
	toggleComments():void{
		this.commentsVisible = !this.commentsVisible
	}
	openForm():void {
		this.POST.isEditing = true
	}
	closeForm(){
		this.POST.isEditing = false
	}

}
