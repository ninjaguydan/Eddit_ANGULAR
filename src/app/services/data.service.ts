import {Injectable} from '@angular/core';
import {IUser} from "../interfaces/IUser";
import {v4 as uuid} from 'uuid'
import {Subject} from "rxjs";
import {IPost} from "../interfaces/IPost";
import {IComment} from "../interfaces/IComment";
import {IThread} from "../interfaces/IMessage";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	currentUser: null | IUser = null
	currentUser$ = new Subject<null | IUser>()
	userList: Array<IUser> = [
		{
			id: '1',
			name: 'Daniel',
			username: 'danboy',
			password: 'pass'
		},
		{
			id: '2',
			name: 'Johnny',
			username: 'longjonsilver',
			password: 'pass'
		},
		{
			id: '3',
			name: 'Josiah',
			username: 'josiV',
			password: 'pass'
		},
	]
	postList: Array<IPost> = [
		{
			id: '111',
			title: 'This game sucks',
			content: 'Why does this boss have so much health? Why is every hit an AOE? Who designed this shit??',
			created: new Date('2022-07-09 08:21'),
			user: '3',
			isEditing: false
		},
		{
			id: '112',
			title: 'Guardian Beast',
			content: 'How do we deal with the thrust kick attack?',
			created: new Date('2022-07-02 13:15'),
			user: '2',
			isEditing: false
		},
		{
			id: '113',
			title: 'Glitchless??',
			content: 'Not sure whether to classify this as a glitch or exploit... If it\'s legal for speedruns this could change everything',
			created: new Date('2022-06-26 16:10'),
			user: '1',
			isEditing: false
		},
	]
	postList$ = new Subject<Array<IPost>>()
	commentList: Array<IComment> = [
		{
			id: '1111',
			post: '112',
			user: '1',
			content: 'Get good',
			created: new Date('2022-07-02 17:11'),
			isEditing: false
		},
		{
			id: '1112',
			post: '112',
			user: '1',
			content: '...jokes aside. You gotta deflect the kicks. They\'ll eat through your posture gauge otherwise',
			created: new Date('2022-07-02 17:13'),
			isEditing: false
		},
		{
			id: '1113',
			post: '113',
			user: '2',
			content: 'That is 100% a glitch. No way it\'s legal',
			created: new Date('2022-06-26 18:12'),
			isEditing: false
		},
		{
			id: '1114',
			post: '113',
			user: '1',
			content: 'It\'s gotta be! It\'s not breaking any rules of the game',
			created: new Date('2022-06-26 18:17'),
			isEditing: false
		}

	]
	commentList$ = new Subject<Array<IComment>>()
	threads:Array<IThread> = [
		{
			id: '1',
			users: ['josiV', 'danboy'],
			messages: [
				{
					sender: 'josiV',
					receiver: 'danboy',
					content: 'This app is garbage',
					created: new Date('2022-07-12 08:32')
				},
				{
					sender: 'danboy',
					receiver: 'josiV',
					content: 'Come on bro be nice',
					created: new Date('2022-07-12 08:45')
				},
				{
					sender: 'josiV',
					receiver: 'danboy',
					content: 'No',
					created: new Date('2022-07-12 10:02')
				},
			]
		},
		{
			id: '2',
			users: ['danboy', 'longjonsilver'],
			messages: [
				{
					sender: 'danboy',
					receiver: 'longjonsilver',
					content: 'yo yo yo',
					created: new Date('2022-06-22 00:00')
				},
				{
					sender: 'longjonsilver',
					receiver: 'danboy',
					content: 'whatup brodie',
					created: new Date('2022-06-22 00:00')
				},
				{
					sender: 'danboy',
					receiver: 'longjonsilver',
					content: 'you a bitch',
					created: new Date('2022-06-22 00:00')
				},
			]
		}
	]
	threads$ = new Subject<Array<IThread>>()

	CREATE_USER(name: string, username: string, pw: string): void | string {
		let foundUser = this.userList.find((user) => user.username.toLowerCase() === username.toLowerCase())
		if (foundUser) return "User already exists"
		this.userList = [
			{
				id: uuid(),
				name: name,
				username: username,
				password: pw
			},
			...this.userList
		]
		this.LOGIN(username, pw)
	}
	LOGIN(username: string, pw: string): void | string {
		let foundUser = this.userList.find((user) => user.username === username)
		if (foundUser && foundUser.password === pw) {
			this.currentUser = foundUser
			this.currentUser$.next(this.currentUser)
		} else {
			return "Username or Password do not match our records"
		}
	}
	LOGOUT():void {
		this.currentUser = null
		this.currentUser$.next(this.currentUser)
	}
	CREATE_POST(post:IPost):void{
		this.postList = [
			{
				...post,
				id: uuid(),
				created: new Date(),
				user: this.currentUser!.id
			},
			...this.postList
		]
		this.postList$.next(this.postList)
	}
	EDIT_POST(post:IPost):void {
		this.postList = this.postList.map((p) => {
			if ( post.id === p.id ) {
				return {...post, isEditing:false}
			} else {
				return p
			}
		})
		this.postList$.next(this.postList)
	}
	DELETE_POST(postId: string):void {
		this.postList = this.postList.filter((post) => post.id !== postId)
		this.postList$.next(this.postList)
		this.commentList = this.commentList.filter((comment) => comment.post !== postId)
		this.commentList$.next(this.commentList)
	}
	CREATE_COMMENT(comment:IComment):void{
		this.commentList = [
			...this.commentList,
			{
				...comment,
				id: uuid(),
				created: new Date(),
				user: this.currentUser!.id
			}
		]
		this.commentList$.next(this.commentList)
	}
	EDIT_COMMENT(comment:IComment):void {
		this.commentList = this.commentList.map((p) => {
			if ( comment.id === p.id ) {
				return {...comment, isEditing:false}
			} else {
				return p
			}
		})
		this.commentList$.next(this.commentList)
	}
	DELETE_COMMENT(commId:string):void {
		this.commentList = this.commentList.filter((comment) => comment.id !== commId)
		this.commentList$.next(this.commentList)
	}
	SEND_MESSAGE(sender:string, recipient:string, content:string){
		let foundThread:IThread|undefined = this.threads.find((t) => t.users.includes(sender) && t.users.includes(recipient))
		if (foundThread) {
			foundThread.messages = [
				...foundThread.messages,
				{
					sender:sender,
					receiver:recipient,
					content:content,
					created: new Date()
				}
			]
			this.threads.map((t) => {
				if ( t.id === foundThread!.id ) {
					return foundThread
				} else {
					return t
				}
			})
			this.threads$.next(this.threads)
		} else {
			let newThread:IThread = {
				id: uuid(),
				users: [sender, recipient],
				messages: [
					{
						sender:sender,
						receiver:recipient,
						content:content,
						created: new Date()
					}
				]
			}
			this.threads.push(newThread)
			this.threads$.next(this.threads)
		}
	}
}
