import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IPost} from "../../interfaces/IPost";

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
	@Input() postToEdit:IPost|undefined
	@Output() closeForm:EventEmitter<void> = new EventEmitter()
	tempPost!:IPost
	error:boolean = false

	constructor(private dataService:DataService) {
		this.tempPost = {
			id: '',
			user: '',
			title: '',
			content: '',
			created: new Date(),
			isEditing: false
		}
	}
	ngOnInit(): void {
		if ( this.postToEdit ) {
			this.tempPost = {...this.postToEdit}
		}
	}
	onAdd(){
		if (this.tempPost.title.trim().length === 0) {
			this.error = true
			return
		}
		this.error = false
		if (this.postToEdit) {
			this.dataService.EDIT_POST(this.tempPost)
		} else {
			this.dataService.CREATE_POST(this.tempPost)
			this.tempPost = {
				id: '',
				user: '',
				title: '',
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
