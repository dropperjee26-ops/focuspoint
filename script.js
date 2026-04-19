async function loadSubject(subject) {
    // Cache bust trick: Adding time as query param
    const response = await fetch('schedule.json?t=' + new Date().getTime());
    const data = await response.json();
    
    // Get IST Date (YYYY-MM-DD)
    const now = new Date();
    const istDate = now.toLocaleDateString('en-CA', {timeZone: 'Asia/Kolkata'});
    
    if (!data[istDate] || !data[istDate][subject]) {
        document.getElementById('status-msg').innerText = "No class scheduled for today.";
        document.getElementById('player-container').innerHTML = `<div class="locked">Relax or Revise!</div>`;
        return;
    }

    const cls = data[istDate][subject];
    const start = new Date(`${istDate}T${cls.start}:00`);
    const end = new Date(`${istDate}T${cls.end}:00`);
    const player = document.getElementById('player-container');
    const status = document.getElementById('status-msg');

    if (now < start) {
        status.innerText = `${cls.title} starts at ${cls.start}`;
        player.innerHTML = `<div class="locked">Don't Procrastinate. Starts soon!</div>`;
    } else if (now >= start && now <= end) {
        status.innerText = "LIVE: " + cls.title;
        player.innerHTML = `<iframe src="https://www.youtube.com/embed/${cls.id}?rel=0&modestbranding=1" frameborder="0" allowfullscreen></iframe>`;
    } else {
        status.innerText = "EXPIRED: " + cls.title;
        player.innerHTML = `<div class="expired">Class window closed. Discipline is priority!</div>`;
    }
}

// Default load Physics on page open
loadSubject('physics');
