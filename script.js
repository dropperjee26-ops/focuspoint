let currentSubject = 'physics';

async function loadSubject(subject) {
    currentSubject = subject;
    // Cache bust trick: Adding ?t= + timestamp so browser fetches new file every time
    const response = await fetch('schedule.json?t=' + new Date().getTime());
    const data = await response.json();
    const schedule = data[subject];
    
    checkSchedule(schedule);
}

function checkSchedule(schedule) {
    const now = new Date();
    const status = document.getElementById('status-msg');
    const player = document.getElementById('player-container');
    const start = new Date(schedule.startTime);
    const end = new Date(schedule.endTime);

    if (now < start) {
        status.innerText = `${schedule.title} starts at ${start.toLocaleTimeString()}`;
        player.innerHTML = `<div class="locked">Class Locked. Focused Raho!</div>`;
    } else if (now >= start && now <= end) {
        status.innerText = "Live: " + schedule.title;
        player.innerHTML = `<iframe src="https://www.youtube.com/embed/${schedule.videoID}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        status.innerText = "Opportunity Missed: " + schedule.title;
        player.innerHTML = `<div class="expired">Discipline is freedom. Missed class will create backlog!</div>`;
    }
}

// Default load
loadSubject('physics');
