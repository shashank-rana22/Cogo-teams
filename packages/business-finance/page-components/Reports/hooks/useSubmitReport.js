import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';

import { DATE_OPTIONAL_APIS } from '../constants';

const useSubmitReport = (value) => {
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
					start_date: !dateOptionnal ? formatDate({
						date       : startDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
						formatType : 'date',
					}) : undefined,
					end_date: !dateOptionnal ? formatDate({
						date       : endDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
						formatType : 'date',
					}) : undefined,
					account_type   : accountType || undefined,
					entity_code_id : value?.activeEntity || undefined,
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
