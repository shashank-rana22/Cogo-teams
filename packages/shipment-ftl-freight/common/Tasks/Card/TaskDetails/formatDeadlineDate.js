const formatDeadlineDate = (deadline) => {
	const currentDate = new Date();
	const diffInMs = deadline.getTime() - currentDate.getTime();

	if (diffInMs < 0) {
		const diffInMin = Math.abs(Math.round(diffInMs / 1000 / 60));
		const diffInHrs = Math.floor(diffInMin / 60);
		const diffInDays = Math.floor(diffInHrs / 24);

		if (diffInMin < 60) {
			return (
				<span>
					{diffInMin}
					&nbsp;
					min ago
				</span>
			);
		} if (diffInHrs < 24) {
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
	const diffInMin = Math.abs(Math.round(diffInMs / 1000 / 60));
	const diffInHrs = Math.floor(diffInMin / 60);
	const diffInDays = Math.floor(diffInHrs / 24);

	if (diffInMin < 60) {
		return (
			<span>
				{diffInMin}
				&nbsp;
				min remaining
			</span>
		);
	} if (diffInHrs < 24) {
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
