const handleEnterFullScreen = ({ setIsFullScreenAvailable }) => {
	const elem = document.getElementById('maincontainer');

	if (elem?.requestFullscreen) {
		elem?.requestFullscreen();
	} else if (elem?.webkitRequestFullscreen) { /* Safari */
		setIsFullScreenAvailable(false);
	} else if (elem?.msRequestFullscreen) { /* IE11 */
		elem?.msRequestFullscreen();
	}
};

export default handleEnterFullScreen;
