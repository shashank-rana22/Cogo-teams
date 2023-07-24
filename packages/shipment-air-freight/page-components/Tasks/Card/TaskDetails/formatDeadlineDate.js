const HOUR_IN_A_DAY = 24;
const MINUTE_IN_AN_HOUR = 60;
const MILLISECOND_IN_A_SECOND = 1000;
const MILLISECOND_DIFFERENCE_CHECK = 0;
const formatDeadlineDate = (deadline) => {
	const currentDate = new Date();
	const diffInMs = deadline.getTime() - currentDate.getTime();

	if (diffInMs < MILLISECOND_DIFFERENCE_CHECK) {
		const diffInMin = Math.abs(Math.round(diffInMs / MILLISECOND_IN_A_SECOND / MINUTE_IN_AN_HOUR));
		const diffInHrs = Math.floor(diffInMin / MINUTE_IN_AN_HOUR);
		const diffInDays = Math.floor(diffInHrs / HOUR_IN_A_DAY);

		if (diffInMin < MINUTE_IN_AN_HOUR) {
			return (
				<span>
					{diffInMin}
					&nbsp;
					min ago
				</span>
			);
		} if (diffInHrs < HOUR_IN_A_DAY) {
			return (
				<span>
					{diffInHrs}
					&nbsp;
					hours ago
				</span>
			);
		}
		return (
			<span>
				{diffInDays}
				&nbsp;
				days ago
			</span>
		);
	}
	const diffInMin = Math.abs(Math.round(diffInMs / MILLISECOND_IN_A_SECOND / MINUTE_IN_AN_HOUR));
	const diffInHrs = Math.floor(diffInMin / MINUTE_IN_AN_HOUR);
	const diffInDays = Math.floor(diffInHrs / HOUR_IN_A_DAY);

	if (diffInMin < MINUTE_IN_AN_HOUR) {
		return (
			<span>
				{diffInMin}
				&nbsp;
				min remaining
			</span>
		);
	} if (diffInHrs < HOUR_IN_A_DAY) {
		return (
			<span>
				{diffInHrs}
				&nbsp;
				hours remaining
			</span>
		);
	}
	return (
		<span>
			{diffInDays}
			&nbsp;
			days remaining
		</span>
	);
};

export default formatDeadlineDate;
