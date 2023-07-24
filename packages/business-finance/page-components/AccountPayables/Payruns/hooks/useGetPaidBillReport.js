import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { dateFormatter } from '../helpers';

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
	const { selectFromDate, selectToDate } = dateFormatter(newdate);

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
