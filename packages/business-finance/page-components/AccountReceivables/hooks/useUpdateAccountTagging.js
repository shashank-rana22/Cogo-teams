import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateAccountTagging = ({ item }) => {
	const [{ loading }, trigger] = useRequest({

		url: 'update_enrichment_request',

		method: 'put',

	}, { manual: true });
	console.log('itemkkkk', item);
	const apiTrigger = async (val) => {
		try {
			const resp = await trigger({
				data: {
					taggedState    : val,
					entityCode     : item?.entityCode,
					organizationId : item?.organizationId,
				},
			});
			Toast.success(resp?.data?.message || 'Deleted successfully');
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Failed to remove');
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateAccountTagging;
