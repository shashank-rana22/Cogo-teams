import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../../commons/toastApiError';

const useSendSyncOverHeadsVendor = () => {
	const [{ loading = false }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/sync-overhead-vendor-to-open-search',
			method  : 'post',
			authKey : 'post_overhead_vendor_to_open_search',
		},
		{ manual: true },
	);

	const sendSyncOverHeadsVendor = async (val) => {
		try {
			await trigger({
				data:
				{
					vendorId        : val?.vendorId,
					entityId        : val?.entityCodeId,
					buyerEntityCode : val?.entityCode,
				},
			});
			Toast.success('Succesfully updated');
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		loading,
		sendSyncOverHeadsVendor,
	};
};

export default useSendSyncOverHeadsVendor;
