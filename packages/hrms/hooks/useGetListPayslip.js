import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetListPayslip = (startYear = null) => {
	const [{ loading, data }, trigger] = useHarbourRequest({

		method: 'GET',

		url: '/list_payslip',

	}, { manual: true });

	const getListPayslip = useCallback(

		async () => {
			try {
				await trigger({

					params: {

						start_year: startYear,

					},

				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},

		[trigger, startYear],

	);

	useEffect(() => {
		if (startYear) {
			getListPayslip(startYear);
		}
	}, [getListPayslip, startYear]);

	return { loading, data };
};

export default useGetListPayslip;
