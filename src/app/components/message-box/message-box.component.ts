import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IUser} from "../../interfaces/IUser";

@Component({
	selector: 'app-message-box',
	templateUrl: './message-box.component.html',
	styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
	selectedValue!:string|undefined
	content:string = ''
	error:boolean = false
	userList!:Array<IUser>
	@Input() MESSAGE_FOR!:string
	@Output() ON_CANCEL:EventEmitter<void> = new EventEmitter

	constructor(private dataService:DataService) {
		this.userList = dataService.userList.filter((user) => user.id !== dataService.currentUser!.id)
	}
	ngOnInit(): void {
		this.selectedValue = this.MESSAGE_FOR
	}
	onCancel(){
		this.ON_CANCEL.emit()
	}
	onSend(){
		if (this.selectedValue === this.dataService.currentUser!.username) {return}
		if (this.content.trim().length === 0) {
			this.error = true
			return
		}
		this.error = false
		this.dataService.SEND_MESSAGE(this.dataService.currentUser!.username,this.selectedValue!,this.content)
		this.onCancel()
	}

}
