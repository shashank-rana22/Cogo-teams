function timeLineFunctions() {
	const callStatus = (call_status = '', callType = '') => {
		let status = '';
		if (call_status === 'answered' && callType === 'outgoing') {
			status = 'outgoing';
		} else if (call_status === 'answered' && callType === 'incoming') {
			status = 'incoming';
		} else {
			status = call_status || callType;
		}
		return status;
	};

	const renderDuration = (duration = '') => {
		let time = '';
		const secs = duration % 60;
		const minute = Math.trunc(duration / 60) % 60;
		const hour = Math.trunc(Math.trunc(duration / 60) / 60) % 60;
		if (hour > 0) {
			time = `${hour} hour ${minute} min ${secs} sec`;
		} else if (minute > 0) {
			time = `${minute} min ${secs} sec`;
		} else if (secs > 0) {
			time = `${secs} sec`;
		}
		return time;
	};

	return { renderDuration, callStatus };
}

export default timeLineFunctions;
