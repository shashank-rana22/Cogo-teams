import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useDeleteFclFreightExtension = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_fcl_freight_rate_extension_rule_set',
		method : 'POST',
	}, { manual: true });

	const deleteFclFreight = async (item) => {
		try {
			const res = await trigger({
				data: { id: item?.id, status: 'inactive' },
			});
			if (!res?.hasError) {
				Toast.success('Deleted Successfully');
				refetch();
			}
		} catch (error) {
			Toast.error('Something Went Wrong!');
		}
	};

	return {
		deleteFclFreight,
		loading,
	};
};

export default useDeleteFclFreightExtension;
