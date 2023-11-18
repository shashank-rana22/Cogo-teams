import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useCreateDeclarations = ({ refetch = () => {}, getCalculatedTax = () => {} }) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : 'create_employee_tax_declarations',
	}, { manual: true });

	const createDeclarations = useCallback(
		async (datasent) => {
			try {
				await trigger({
					params: {
						employee_id  : GLOBAL_CONSTANTS.calculator.emp_id,
						declarations : {
							hra   : datasent?.hra,
							'80C' : datasent?.EightyC,
						},
					},
				});
				refetch();
				getCalculatedTax();
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[getCalculatedTax, refetch, trigger],
	);

	return {
		loading,
		declarationsData: data,
		createDeclarations,
	};
};

export default useCreateDeclarations;
