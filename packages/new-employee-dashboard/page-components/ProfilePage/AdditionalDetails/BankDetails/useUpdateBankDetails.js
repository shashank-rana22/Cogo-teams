import { useHarbourRequest } from '@cogoport/request';

const useUpdateBankDetails = ({ id }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_bank_details',
		method : 'POST',
	}, { manual: true });

	const updateBankDetails = async ({ status }) => {
		try {
			await trigger({
				data: {
					status,
					id                : id || undefined,
					performed_by_id   : 'sdfghjk',
					performed_by_type : 'sdfghjkl',
				},
			});
		} catch (err) {
			console.log('err', err);
		}
	};

	return {
		loading,
		updateBankDetails,
	};
};

export default useUpdateBankDetails;
