import { useState, useEffect } from 'react';

const useKey = (targetKey) => {
	const [keyPressed, setKeyPressed] = useState(false);

	// If pressed key is our target key then set to true
	function downHandler({ key }) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	// If released key is our target key then set to false

	const upHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	// Add event listeners

	useEffect(() => {
		window.addEventListener('keydown', downHandler);

		window.addEventListener('keyup', upHandler);

		// Remove event listeners on cleanup

		return () => {
			window.removeEventListener('keydown', downHandler);

			window.removeEventListener('keyup', upHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return keyPressed;
};

export default useKey;
