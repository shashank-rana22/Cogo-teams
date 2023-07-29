import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateBulkData = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/update_bulk_employee_details',
	}, { manual: true });

	const updateBulkData = async (values) => {
		try {
			await trigger({
				data: values,
			});
			Toast.success('Data Updated Sucessfully');
		} catch (error) {
			console.log('err', error);
		}
	};

	return { loading, updateBulkData };
};

export default useUpdateBulkData;
