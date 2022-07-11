import {Component, Input, OnInit} from '@angular/core';
import {IComment} from "../../interfaces/IComment";
import {IUser} from "../../interfaces/IUser";
import {DataService} from "../../services/data.service";

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
	@Input() COMMENT!:IComment
	@Input() postId!:string
	user!:IUser
	currentUser!:boolean

	constructor(private dataService:DataService) {
	}
	ngOnInit(): void {
		this.user = this.dataService.userList.find((user) => user.id === this.COMMENT.user)!
		this.currentUser = this.dataService.currentUser!.id === this.user.id
	}
	onDelete():void{
		this.dataService.DELETE_COMMENT(this.COMMENT.id)
	}
	openForm():void {
		this.COMMENT.isEditing = true
	}
	closeForm(){
		this.COMMENT.isEditing = false
	}

}
