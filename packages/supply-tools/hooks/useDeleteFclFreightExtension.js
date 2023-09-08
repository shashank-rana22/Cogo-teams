import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeleteFclFreightExtension = (refetch) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_fcl_freight_rate_extension_rule_set',
		method : 'POST',
		scope,
	}, { manual: false });

	const deleteFclFreight = async (item) => {
		try {
			const res = await trigger({
				data: { id: item?.id, status: 'inactive' },
			});
			if (!res?.hasError) {
				Toast.success(' Deleted Successfully');
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
