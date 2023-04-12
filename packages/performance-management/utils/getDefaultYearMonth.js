import { getYear, getMonth } from '@cogoport/utils';

import monthOptions from '../constants/month-options';

const getDefaultFeedbackMonth = () => {
	const currentDate = new Date();
	const currentMonth = getMonth(currentDate);
	const currentYear = getYear(currentDate);

	const feedbackMonth = monthOptions[currentMonth > 0 ? currentMonth - 1 : 11].value;
	const feedbackYear = currentMonth > 0 ? currentYear : currentYear - 1;

	return { feedbackMonth, feedbackYear };
};

export default getDefaultFeedbackMonth;
