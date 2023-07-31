import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { dateFormatter } from '../helpers';

const getSendReportPayload = ({ rest, selectFromDate, selectToDate, size, user_id, activePayrunTab }) => ({
	...rest,
	startDate   : selectFromDate || undefined,
	endDate     : selectToDate || undefined,
	pageSize    : size,
	performedBy : user_id,
	state       : activePayrunTab,
});

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

	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/purchase/report/paid-bills',
		method  : 'get',
		authKey : 'get_purchase_report_paid_bills',
	}, { manual: true, autoCancel: false });

	const { ...rest } = globalFilters;
	const { selectFromDate, selectToDate } = dateFormatter(newdate);

	const sendInvoiceReport = (dates) => {
		if (dates === 'Invalid_Range') {
			Toast.error('Please select a range less then a month');
		} else if (dates) {
			const payload = getSendReportPayload({
				rest,
				selectFromDate,
				selectToDate,
				size,
				user_id,
				activePayrunTab,
			});
			try {
				trigger({
					params: payload,
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
		sendReportLoading: loading,
		data,
	};
};

export default useGetPaidBillReport;
