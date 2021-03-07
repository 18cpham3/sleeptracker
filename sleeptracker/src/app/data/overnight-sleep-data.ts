import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;
	private sleepRating:number;
	private sleepNotes:String;

	constructor(sleepStart:Date, sleepEnd:Date, sleepRating:number, sleepNotes:string) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.sleepNotes = sleepNotes;
		this.sleepRating = sleepRating
	}

	summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;

		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
	}

	dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	ratingString():string{
			if (this.sleepRating == 1){
				return `Sleep rating: ${this.sleepRating} - Awful`
			}
			else if (this.sleepRating == 2){
					return `Sleep rating: ${this.sleepRating} - Bad`
			}
			else if (this.sleepRating == 3){
					return `Sleep rating: ${this.sleepRating} - Mediocre`
			}
			else if (this.sleepRating == 4){
					return `Sleep rating: ${this.sleepRating} - Great`
			}
			return `Sleep rating: ${this.sleepRating} - Excellent`
	}

	noteString():string{
		return `Note(s): ${this.sleepNotes}`
	}
}
