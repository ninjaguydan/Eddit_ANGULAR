import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IThread} from "../../interfaces/IMessage";
import {IUser} from "../../interfaces/IUser";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-thread-list',
	templateUrl: './thread-list.component.html',
	styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnDestroy {
	@Output() ON_CANCEL:EventEmitter<void> = new EventEmitter()
	currentUser!:IUser
	selectedThread!:IThread
	threadList:Array<IThread> = []
	threadListSUB:Subscription
	content:string = ''
	error:boolean = false

	constructor(private dataService:DataService) {
		this.currentUser = dataService.currentUser!
		this.threadList = dataService.threads
			.filter((t) => t.users.includes(dataService.currentUser!.username))
			.map((t) =>  {
				return {
					...t,
					users: t.users.filter((t) => t !== dataService.currentUser!.username)
				}
			})
		this.selectedThread = this.threadList[0]
		this.threadListSUB = dataService.threads$.subscribe((newThreads) => {
			this.threadList = newThreads
				.filter((t) => t.users.includes(dataService.currentUser!.username))
				.map((t) =>  {
					return {
						...t,
						users: t.users.filter((t) => t !== dataService.currentUser!.username)
					}
				})
			this.selectThread(this.selectedThread.id)
		})
	}
	ngOnDestroy() {
		this.threadListSUB.unsubscribe()
	}
	selectThread(threadId:string):void{
		this.selectedThread = this.threadList.find((t) => t.id === threadId)!
	}
	onSend():void {
		if (this.content.trim().length === 0) {
			this.error = true
			return
		}
		this.error = false
		this.dataService.SEND_MESSAGE(this.currentUser.username,this.selectedThread.users[0],this.content)
		this.content = ''
	}
	onCancel():void{
		this.ON_CANCEL.emit()
	}
}
