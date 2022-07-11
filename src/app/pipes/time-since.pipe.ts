import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

	transform(value:Date, ...args: unknown[]): unknown {
		if (value) {
			const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
			if (seconds < 29)
				return 'Just now'; // Show 'just now' if less than 30 seconds
			const intervals:any = {
				'y': 31536000,
				'mo': 2592000,
				'w': 604800,
				'd': 86400,
				'h': 3600,
				'm': 60,
				's': 1
			};
			let counter;
			for (const i in intervals) {
				counter = Math.floor(seconds / intervals[i]);
				if (counter > 0)
					return counter + i;
			}
		}
		return value;
	}
}
