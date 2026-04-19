// Configuration: Set your class times here (Year, Month (0-11), Day, Hour, Min)
const classSchedule = {
    title: "Current Session",
    videoID: "8860Pd6eyjg", // Replace with your YouTube Video ID
    start: new Date(2026, 3, 19, 10, 0), // April 19, 2026, 10:00 AM
    end: new Date(2026, 3, 19, 23, 0)    // April 19, 2026, 11:00 PM
};

function checkTime() {
    const now = new Date();
    const status = document.getElementById('status-msg');
    const player = document.getElementById('player-container');

    if (now < classSchedule.start) {
        status.innerText = "Class hasn't started yet. Be patient.";
        player.innerHTML = `<img src="https://via.placeholder.com/800x450?text=Locked+Until+Scheduled+Time" width="100%">`;
    } 
    else if (now >= classSchedule.start && now <= classSchedule.end) {
        status.innerText = "Live: " + classSchedule.title;
        if (!player.innerHTML.includes('iframe')) {
            player.innerHTML = `<iframe src="https://www.youtube.com/embed/${classSchedule.videoID}?rel=0" frameborder="0" allowfullscreen></iframe>`;
        }
    } 
    else {
        status.innerText = "Content Expired. You missed the window!";
        player.innerHTML = `<div style="padding:50px; background:#222;">Class Ended. Tomorrow is a new chance.</div>`;
    }
}

setInterval(checkTime, 1000);
checkTime();
