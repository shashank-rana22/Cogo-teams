import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useSaveVerifiedOrganization = ({
	setOrgData, refetch,
}) => {
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/defaulters',
			method  : 'post',
			authKey : 'post_payments_defaulters',
		},
		{ manual: true },
	);

	const createBpr = async (
		tradePartyDetailSerialId,
		businessName,
		tradePartyDetailId,
	) => {
		try {
			const resp = await trigger({
				data: { tradePartyDetailSerialId, businessName, tradePartyDetailId },
			});
			Toast.success(resp?.data?.message || 'Data save successfully in list');
			refetch();
			setOrgData({});
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Failed to save data');
		}
	};
	return {
		createBpr,
		loadingOnSave: loading,
	};
};

export default useSaveVerifiedOrganization;
