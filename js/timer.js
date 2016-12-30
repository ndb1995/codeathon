var count;
var counter = 0;
var timerStarted = false;
var phone = "911";
var startTime;
var timer;

$('#timer-start, #timer-cancel').click(function ()
{
    if (this.id == 'timer-start')
    {
        StartTimer ();
    }
    else if (this.id == 'timer-cancel')
    {
        StopTimer();
        navigator.notification.alert('You cancelled the timer',callBackFunction,'Timer cancelled','Ok');
    }
});

function callBackFunction(){
	console.log("Clicked");
}

function StartTimer()
{
    var minutes = document.getElementById("timer-time").value;

    if (minutes.match(/^\d+$/))
    {
        count = minutes * 60;
    }
    else
    {
        // if the user does not specify an ammount of time
        // set the default time to 10 minutes.

        count = 10 * 60;
    }

    timerStarted = true;
	startTime = new Date();
    counter = setInterval(Timer, 1000);

    document.getElementById("timer-title").innerHTML = "Timer Started";

    UpdateDisplay ("timer-start", "none");
    UpdateDisplay ("timer-cancel", "block");
    UpdateDisplay ("timer-number", "none");
    UpdateDisplay ("timer-time", "none");
}

function StopTimer ()
{
    timerStarted = false;

    document.getElementById("timer-title").innerHTML = "Expect Me";

    UpdateDisplay ("timer-start", "block");
    UpdateDisplay ("timer-cancel", "none");
    UpdateDisplay ("timer-number", "block");
    UpdateDisplay ("timer-time", "block");

}

function Timer ()
{
    if (timerStarted == true)
    {
        
		
		var now = new Date();
		var timeDiff = new Date(now - startTime); // constructor uses UTC, so use UTC date functions from here on
		var hours = timeDiff.getUTCHours();
		var mins = (timeDiff.getUTCMinutes() < 10) ? '0' + timeDiff.getUTCMinutes() : timeDiff.getUTCMinutes();
		var secs = (timeDiff.getUTCSeconds() < 10) ? '0' + timeDiff.getUTCSeconds() : timeDiff.getUTCSeconds();
		console.log("Hours " + hours + " Minutes: " + mins + " Seconds: " + secs);
		var correctHours = hours  * 60 * 60;
		var correctMinutes = mins * 60;
		var correctSeconds = secs;
		var correctTime = parseInt(correctHours) + parseInt(correctMinutes) + parseInt(correctSeconds);
		console.log("Correct Hours " + correctHours + " Correct Minutes: " + correctMinutes + " Correct Seconds: " + correctSeconds);
		console.log("Count: " + count + " Correct Time: " + correctTime)
        if (count == correctTime)
        {
            timerStarted = false;
            clearInterval(counter);
            phone = document.getElementById("timer-number").value;
            window.open("tel:" + phone, '_system');
            StopTimer();

            // document.getElementById("timer-title").innerHTML = "Time me home";
            // UpdateDisplay ("timer-start", "block");
            // UpdateDisplay ("timer-cancel", "none");

            return;
        }
		
        // document.getElementById ("timer-title").innerHTML = (count / 60).toFixed(2);
        document.getElementById("timer-title").innerHTML = correctTime + " Seconds";
    }
}

function UpdateDisplay (id, display)
{
    var element = document.getElementById(id);
    element.style.display = display;
}