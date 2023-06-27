import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateEmployeeFinalRating = (data) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_employee_final_rating',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeFinalRating = async ({ starRating, comments }) => {
		try {
			await trigger({
				data: {
					employee_id         : data?.employee_details?.employee_id,
					manager_id          : data?.employee_details?.manager_id,
					kra_rating_assigned : starRating,
					comments,
					start_date          : '2023-06-21',
					end_date            : '2023-07-20',
				},
			});

			Toast.success('Sucessfully Update Rating');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updateEmployeeFinalRating,
		loading,
	};
};

export default useUpdateEmployeeFinalRating;
