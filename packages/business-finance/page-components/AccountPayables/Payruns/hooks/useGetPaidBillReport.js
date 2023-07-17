import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetPaidBillReport = ({
	size,
	globalFilters,
	newdate,
	setNewDate,
	setShowReport,
	activePayrunTab,
}) => {
	const { profile = {} } = useSelector((state) => state);
	const { user = {} } = profile;
	const { id: user_id } = user;
	const [{ data, loading: sendReportLoading }, trigger] = useRequestBf({
		url     : '/purchase/report/paid-bills',
		method  : 'get',
		authKey : 'get_purchase_report_paid_bills',
	}, { manual: true, autoCancel: false });
	const { ...rest } = globalFilters;
	const selectFromDate =		newdate
	&& formatDate({
		date       : newdate.startDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const selectToDate =		newdate
	&& formatDate({
		date       : newdate.endDate,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	const sendInvoiceReport = async (dates) => {
		if (dates === 'Invalid_Range') {
			Toast.error('Please select a range less then a month');
		} else if (dates) {
			try {
				await trigger({
					params: {
						...rest,
						startDate   : selectFromDate || undefined,
						endDate     : selectToDate || undefined,
						pageSize    : size,
						performedBy : user_id,
						state       : activePayrunTab,
					},
				});
				setNewDate();
				Toast.success('Report has been sent successfully');
				setShowReport(false);
			} catch (e) {
				setNewDate();
				Toast.error(e?.error?.message || 'Failed to send Report');
				setShowReport(false);
			}
		} else {
			Toast.error('Please select date range');
		}
	};
	return {
		sendInvoiceReport,
		sendReportLoading,
		data,
	};
};

export default useGetPaidBillReport;
