import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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
						employee_id  : 'dfca5d91-8906-d146-2970-202eace33a66',
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
