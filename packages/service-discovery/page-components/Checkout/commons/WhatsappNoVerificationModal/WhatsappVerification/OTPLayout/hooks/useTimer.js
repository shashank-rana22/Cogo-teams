import { useState, useEffect, useCallback, useRef } from 'react';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const SECONDS_PER_DAY = HOURS_PER_DAY * SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const SECONDS_PER_HOUR = MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
const TEN = 10;
const DEFAULT_VALUE = 0;
const ONE = 1;

const useTimer = ({ durationInSeconds = 0 }) => {
	const [seconds, setSeconds] = useState(DEFAULT_VALUE);
	const [isActive, setIsActive] = useState(true);

	const timerIntervalRef = useRef();

	useEffect(() => {
		setSeconds(durationInSeconds);
	}, [durationInSeconds]);

	useEffect(() => {
		if (!seconds) {
			if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

			setIsActive(false);
		}

		if (isActive && seconds) {
			timerIntervalRef.current = setInterval(() => {
				setSeconds((previousState) => previousState - ONE);
			}, MILLISECONDS_PER_SECOND);
		}

		return () => {
			if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
		};
	}, [isActive, seconds]);

	const start = useCallback(() => {
		setSeconds((previousState) => (!previousState ? durationInSeconds : previousState));
		setIsActive(true);
	}, [durationInSeconds]);

	const pause = useCallback(() => {
		setIsActive(false);
	}, []);

	const restart = useCallback(() => {
		setSeconds(durationInSeconds);
		setIsActive(true);
	}, [durationInSeconds]);

	const reset = useCallback(() => {
		setSeconds(durationInSeconds);
		setIsActive(false);
	}, [durationInSeconds]);

	const getRemainingTime = (duration) => {
		const days = Math.floor(duration / SECONDS_PER_DAY);
		const hours = Math.floor((duration - days * SECONDS_PER_DAY) / SECONDS_PER_HOUR);
		const minutes = Math.floor(
			(duration - days * SECONDS_PER_DAY - hours * SECONDS_PER_HOUR) / MINUTES_PER_HOUR,
		);
		const secs = duration - days * SECONDS_PER_DAY - hours * SECONDS_PER_HOUR - minutes * SECONDS_PER_MINUTE;

		const isTimeRemaining = !(!days && !hours && !minutes && !secs);

		return {
			days    : days < TEN ? `0${days}` : `${days}`,
			hours   : hours < TEN ? `0${hours}` : `${hours}`,
			minutes : minutes < TEN ? `0${minutes}` : `${minutes}`,
			seconds : secs < TEN ? `0${secs}` : `${secs}`,

			isTimeRemaining,
		};
	};

	return {
		...getRemainingTime(seconds),
		isActive,
		start,
		pause,
		restart,
		reset,
	};
};

export default useTimer;
