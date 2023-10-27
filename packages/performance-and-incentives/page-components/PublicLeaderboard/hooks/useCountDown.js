import { useState, useEffect } from 'react';

function useCountDown({ updatedAt = '', trigger = () => {} }) {
	const inputDate = new Date(updatedAt);

	const addedDate = new Date(inputDate.getTime() + 35 * 60000);

	const currentDate = new Date();
	const timeDifferenceInMinutes = Math.floor((addedDate - currentDate) / 1000);

	const [countdown, setCountdown] = useState(timeDifferenceInMinutes);

	useEffect(() => {
		setCountdown(timeDifferenceInMinutes);
	}, [timeDifferenceInMinutes]);

	useEffect(() => {
		if (countdown > 0) {
			const intervalId = setInterval(() => {
				setCountdown(countdown - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}

		if (countdown === 0) {
			trigger();
		}

		return () => {};
	}, [countdown, trigger]);

	return {
		countdown,
	};
}

export default useCountDown;
