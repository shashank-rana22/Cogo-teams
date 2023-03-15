import { isEmpty } from '@cogoport/utils';

export const callStatus = (callStatu = '', callType = '') => {
	let status = '';
	if (callStatu === 'answered' && callType === 'outgoing') {
		status = 'outgoing';
	} else if (callStatu === 'answered' && callType === 'incoming') {
		status = 'incoming';
	} else if (isEmpty(callStatu)) {
		status = callType;
	} else {
		status = callStatu;
	}
	return status;
};

export const renderDuration = (duration = '') => {
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

export const renderStatement = ({ type, present, previous }) => {
	switch (type) {
		case 'assigned':
			return `${previous} assigned this chat to ${present}`;
		case 'escalate':
			return `This chat has been escalated to ${present}`;
		case 'closed':
			return `This chat has been closed by ${previous}`;
		case 'assign_to_me':
			return `${previous} assigned this chat to himself`;
		case 'auto_assign':
			return `This chat is auto assigned to ${present}`;
		default:
			return null;
	}
};
