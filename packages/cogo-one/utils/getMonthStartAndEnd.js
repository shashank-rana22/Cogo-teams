import moment from 'moment';

const getMonthStartAndEnd = ({ month }) => {
	const startDate = moment(month || new Date()).startOf('month').toDate();
	const endDate = moment(month || new Date()).endOf('month').toDate();

	return { startDate, endDate };
};

export default getMonthStartAndEnd;
