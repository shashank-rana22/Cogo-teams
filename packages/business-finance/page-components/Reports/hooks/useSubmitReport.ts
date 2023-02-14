import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';

interface DateInterface {
	startDate?:Date,
	endDate?:Date
}

interface Props {
	reportType?:string,
	dateRange?: DateInterface,
}

const useSubmitReport = (value:Props) => {
	const { dateRange, reportType } = value || {};
	const [{ loading }, trigger] = useRequestBf({
		url     : `/muneem/reports/${reportType}`,
		method  : 'GET',
		authKey : `get_muneem_reports_${reportType}`,

	}, { manual: true });

	const api = async () => {
		const { startDate, endDate } = dateRange || {};

		try {
			const response = await trigger({
				params: {
					start_date : format(startDate, 'yyyy-MM-dd', {}, false) || undefined,
					end_date   : format(endDate, 'yyyy-MM-dd', {}, false) || undefined,
				},
			});

			if (response?.data?.message) {
				Toast.success(
					response.data?.message,
				);
			}
		} catch (e) {
			if (e.response?.status === 403) {
				Toast.error(
					'You do not have permission to access this feature',
				);
			} else {
				Toast.error(
					'Something went wrong',
				);
			}
		}
	};
	return { api, loading };
};

export default useSubmitReport;
