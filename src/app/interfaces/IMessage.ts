export interface IMessage {
	sender:string
	receiver:string
	content:string
	created:Date
}
export interface IThread {
	id:string
	users:Array<string>
	messages:Array<IMessage>
}