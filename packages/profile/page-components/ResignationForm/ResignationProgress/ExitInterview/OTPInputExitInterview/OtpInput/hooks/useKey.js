/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const useKey = (targetKey) => {
	const [keyPressed, setKeyPressed] = useState(false);

	function downHandler({ key }) {
		if (key === targetKey) {
			setKeyPressed(true);
		}
	}

	const upHandler = ({ key }) => {
		if (key === targetKey) {
			setKeyPressed(false);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', downHandler);

		window.addEventListener('keyup', upHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);

			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	return keyPressed;
};

export default useKey;
