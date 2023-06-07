import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';

const useSaveVerifiedOrganization = ({
	setOrgData,
	refetch,
	setInputName,
	setInputSerialId,
}) => {
	const { trigger, loading } = useRequest('post', false, 'business_finance', {
		authkey: 'post_payments_defaulters',
	})('/payments/defaulters');

	const createBpr = async (
		tradePartyDetailSerialId,
		businessName,
		tradePartyDetailId,
	) => {
		try {
			const resp = await trigger({
				data: { tradePartyDetailSerialId, businessName, tradePartyDetailId },
			});
			toast.success(resp?.data?.message || 'Data save successfully in list');
			refetch?.();
			setOrgData?.();
			setInputName('');
			setInputSerialId('');
		} catch (err) {
			toast.error(err?.error?.message || 'Failed to save data');
		}
	};
	return {
		createBpr,
		loadingOnSave: loading,
	};
};

export default useSaveVerifiedOrganization;
