import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import { getPayload } from '../helpers/getCalendarPayload';
import getMonthStartAndEnd from '../utils/getMonthStartAndEnd';

const useCreateCogooneCalendar = ({
	setEventDetails = () => {}, eventDetails = {},
	reset = () => {},
	getEvents = () => {},
	month = '',
	id = '',
	updatedIds = {},
	setMonth = () => {},
	setAddEvents = () => {},
	setMyEvents = () => {},
	updateEventDetails = {},
}) => {
	const getUrl = id ? '/update_cogoone_calendar' : '/create_cogoone_calendar';

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : getUrl,
	}, { manual: true });

	const createEvent = async ({ values = {}, eventData = {} }) => {
		const { startDate, endDate } = getMonthStartAndEnd({ month });

		try {
			await trigger({
				data: getPayload({
					eventDetails,
					values,
					eventData,
					updatedIds,
					updateEventDetails,
				}),
			});
			setEventDetails({
				category   : 'event',
				event_type : 'call_customer',
			});
			setMonth(new Date(values?.start_date || eventData?.start_date));
			setMyEvents({ start: (values?.start_date || eventData?.start_date) });
			setAddEvents(true);
			Toast.success(`${startCase(eventDetails?.category)} Scheduled Successfully`);
			reset();
			getEvents({ startDate, endDate });
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		createEvent,
	};
};

export default useCreateCogooneCalendar;
