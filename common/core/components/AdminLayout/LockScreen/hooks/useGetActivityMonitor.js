const Z = 100000;
function idleLogout() {
	let t;

	function yourFunction() {
		// your function for too long inactivity goes here
		// e.g. window.location.href = 'logout.php';
	}

	function resetTimer() {
		clearTimeout(t);
		t = setTimeout(yourFunction, Z); // time is in milliseconds
	}

	window.onload = resetTimer;
	window.onmousemove = resetTimer;
	window.onmousedown = resetTimer; // catches touchscreen presses as well
	window.ontouchstart = resetTimer; // catches touchscreen swipes as well
	window.ontouchmove = resetTimer; // required by some devices
	window.onclick = resetTimer; // catches touchpad clicks as well
	window.onkeydown = resetTimer;
	window.addEventListener('scroll', resetTimer, true); // improved; see comments
}
idleLogout();
