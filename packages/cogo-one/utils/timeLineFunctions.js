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

	const renderStatement = ({ type = '', present = '', previous = '', startAt = null, voiceCallStatus = '' }) => {
		switch (type) {
			case 'assigned':
				if (startAt === null) {
					return `${previous} assigned this chat as spectator to ${present}`;
				}
				return `${previous} assigned this chat to ${present}`;
			case 'escalate':
				return `This chat has been escalated to ${present}`;
			case 'closed':
				return `This chat has been closed by ${previous}`;
			case 'assign_to_me':
				return `${previous} assigned this chat to himself`;
			case 'auto_assign':
				return `This chat is auto assigned to ${present}`;
			case 'requested_to_chat':
				return `${previous} requested ${present} to assign this chat`;
			case 'incoming':
				return `${present} got incoming call from ${previous}. he/she ${voiceCallStatus}`;
			case 'outgoing':
				return `${present} called ${previous}. he/she ${voiceCallStatus}`;
			default:
				return null;
		}
	};
	return { renderDuration, renderStatement, callStatus };
}

export default timeLineFunctions;
