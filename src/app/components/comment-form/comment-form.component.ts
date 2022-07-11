import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment} from "../../interfaces/IComment";
import {DataService} from "../../services/data.service";

@Component({
	selector: 'app-comment-form',
	templateUrl: './comment-form.component.html',
	styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
	@Input() commentToEdit:IComment|undefined
	@Input() postId!:string
	@Output() closeForm:EventEmitter<void> = new EventEmitter()
	tempComment!:IComment
	error:boolean = false

	constructor(private dataService:DataService) {
		this.tempComment = {
			id: '',
			post: '',
			user: '',
			content: '',
			created: new Date(),
			isEditing: false
		}
	}
	ngOnInit(): void {
		this.tempComment.post = this.postId
		if ( this.commentToEdit ) {
			this.tempComment = {...this.commentToEdit}
		}
	}
	onAdd(){
		if (this.tempComment.content.trim().length === 0) {
			this.error = true
			return
		}
		this.error = false
		if (this.commentToEdit) {
			this.dataService.EDIT_COMMENT(this.tempComment)
		} else {
			this.dataService.CREATE_COMMENT(this.tempComment)
			this.tempComment = {
				id: '',
				user: '',
				post: this.postId,
				content: '',
				created: new Date(),
				isEditing: false
			}
		}
		this.onCancel()
	}
	onCancel(){
		this.closeForm.emit()
	}

}
