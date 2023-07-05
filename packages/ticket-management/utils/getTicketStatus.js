import { TICKET_OPEN_STATUS } from '../constants';

const getTicketStatus = (val) => {
	if (TICKET_OPEN_STATUS.includes(val)) {
		return 'open';
	}
	if (val === 'overdue') {
		return 'closed';
	}
	return val;
};

export default getTicketStatus;
