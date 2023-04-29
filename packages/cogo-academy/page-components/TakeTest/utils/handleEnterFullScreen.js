const handleEnterFullScreen = () => {
	const elem = document.getElementById('maincontainer');

	if (elem?.requestFullscreen) {
		elem?.requestFullscreen();
	} else if (elem?.webkitRequestFullscreen) { /* Safari */
		elem?.webkitRequestFullscreen();
	} else if (elem?.msRequestFullscreen) { /* IE11 */
		elem?.msRequestFullscreen();
	}
};

export default handleEnterFullScreen;
