import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { format } from '@cogoport/utils';

import { DATE_OPTIONAL_APIS } from '../constants';

interface DateInterface {
	startDate?:Date,
	endDate?:Date
}

interface Props {
	reportType?:string,
	dateRange?: DateInterface,
	accountType?:string,
}

const useSubmitReport = (value:Props) => {
	const { dateRange, reportType, accountType } = value || {};
	const apiKey = reportType?.replaceAll('-', '_');
	const dateOptionnal = DATE_OPTIONAL_APIS.includes(reportType);

	const [{ loading }, trigger] = useRequestBf({
		url     : `/muneem/reports/${reportType}`,
		method  : 'GET',
		authKey : `get_muneem_reports_${apiKey}`,

	}, { manual: true });

	const api = async () => {
		const { startDate, endDate } = dateRange || {};

		try {
			const response = await trigger({
				params: {
					start_date   : !dateOptionnal ? format(startDate, 'yyyy-MM-dd', {}, false) : undefined,
					end_date     : !dateOptionnal ? format(endDate, 'yyyy-MM-dd', {}, false) : undefined,
					account_type : accountType || undefined,
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
