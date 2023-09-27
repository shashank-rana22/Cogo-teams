import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useDeleteWeightSlabs = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_fcl_weight_slabs_configuration',
	}, { manual: true });

	const deleteWeightSlabs = async (item) => {
		try {
			const res = await trigger({
				data: { id: item?.id, status: 'inactive' },
			});

			if (!res?.hasError) {
				Toast.success('WeightSlabs Deleted Successfully');
				refetch();
			}
		} catch (error) {
			Toast.error('Something Went Wrong!');
		}
	};

	return {
		deleteWeightSlabs,
		loading,
	};
};

export default useDeleteWeightSlabs;
