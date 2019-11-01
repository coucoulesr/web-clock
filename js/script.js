/*
 * Analog and Digital Clock
 * Author: Richard Coucoules
 * Adapted from exercise written by Morten Rand-Hendriksen
 * October 29, 2019
 *
 * Notes: The clocks on the rendered page increment manually/programmatically
 *    and are, therefore, prone to desync from the actual time if they run for
 *    extended periods. This manual incrementation of the clock primarily
 *    prevents graphical errors in the analog clock and secondarily prevents
 *    desyncing errors between the analog and digital clocks.
*/

const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");
const DIGITALCLOCK = document.querySelector("#digital-clock");

//Digital clock functions
function Time(hour, min, sec, am) {
	// Defines and constructs Time class, used in displaying the digital clock.
	// Contains hour, minute, second as integers and a boolean, am, to indicate day/night.
	this.hour = hour;
	this.min = min;
	this.sec = sec;
	this.am = am;
}

function initTime() {
	// Instantiates a Time object with attributes assigned according to the user's current time.
	var now = new Date();
	var hour = now.getHours() % 12;
	hour = (hour == 0) ? 12 : hour;
	var min = now.getMinutes();
	var sec = now.getSeconds();
	var ampm = (Math.floor(now.getHours() / 12) == 0);
	return new Time(hour, min, sec, ampm);
}

function updateTime(timeobj) {
	// Manually increments an input Time object by one second.
	// Using this function keeps the analog and digital clocks in sync.
	if (timeobj.sec == 59) {
		timeobj.sec = 0;
		if (timeobj.min == 59) {
			timeobj.min = 0;
			if (timeobj.hour == 12) {
				timeobj.hour = 1;
			}
			else if (timeobj.hour == 11) {
				timeobj.am = !timeobj.am;
				timeobj.hour += 1;
			}
			else { // if timeobj.hour != 11 or 12
				timeobj.hour += 1;
			}
		}
		else{ // if timeobj.min != 59
			timeobj.min += 1;
		}
	}
	else { // if timeobj.sec != 59
		timeobj.sec += 1;
	}	
}

function writeTimeStr(timeobj, clockelement) {
	// Writes the formatted contents of the Time object timeobj into the element clockelement.
	outstr = (timeobj.hour < 10) ? "0" + timeobj.hour + ":": timeobj.hour + ":";
	outstr += (timeobj.min < 10) ? "0" + timeobj.min + ":" : timeobj.min + ":";
	outstr += (timeobj.sec < 10) ? "0" + timeobj.sec : timeobj.sec;
	outstr += timeobj.am ? " AM" : " PM";
	clockelement.innerHTML = outstr;
}
// End digital clock functions

// Analog clock functions
function initAngles() {
	// Calculates the appropriate angles for the hour, minute, and second hands in degrees.
	// Outputs the degree values as an array in the [h, m, s] format.
	var now = new Date();
	var hourangle = ((now.getHours() % 12) + (now.getMinutes() / 60) + (now.getSeconds() / 3600)) * (360 / 12);
	var minangle = (now.getMinutes() + (now.getSeconds() / 60)) * 360 / 60;
	var secangle = now.getSeconds() * 360 / 60;
	return [hourangle, minangle, secangle];
}


function updateAngleArray(hmsanglearray) {
	// Manually increments the angles in hmsanglearray by the number of degrees corresponding to one second.
	// Fixes the issue where, if the angle values are tied to the time values in a Date object, the hands
	//   reset to 12 o'clock by spinning counterclockwise around the entire face of the clock.
	hmsanglearray[0] += 360 * (1/12) * (1/3600);
	hmsanglearray[1] += 360 * (1/60) * (1/60);
	hmsanglearray[2] += 360 * (1/60);
	return hmsanglearray;
}

function setAngle(hourhand, minhand, sechand, hmsanglearray) {
	// Applies the appropriatee transforms to the html elements containing hourhand, minutehand, and sechand.
	// For some reason, hourhand.style.transform = ... doesn't work.
	hourhand.setAttribute("style", ("transform: rotate(" + hmsanglearray[0] + "deg);"));
	minhand.setAttribute("style", ("transform: rotate(" + hmsanglearray[1] + "deg);"));
	sechand.setAttribute("style", ("transform: rotate(" + hmsanglearray[2] + "deg);"));
}
// End analog clock functions

function updatePage(timeobj, hmsarray) {
	// Performs all subroutines to update clock values in memory and on page.
	updateAngleArray(hmsarray);
	updateTime(timeobj);
	setAngle(HOURHAND, MINUTEHAND, SECONDHAND, hmsarray);
	writeTimeStr(timeobj, DIGITALCLOCK);
}


// Main program:
//   Initial time and angles are taken with data from Date object.
time = initTime();
angles = initAngles();

//   These time and angle values are updated every second and manually incremented programmatically.
setInterval(updatePage, 1000, time, angles);