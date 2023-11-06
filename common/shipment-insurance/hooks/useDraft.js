import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { getPayloadForSaveAsDraft } from '../helper/getDraftPayload';

const useDraft = ({ policyDetails = {}, formHook, billingType = '', formRef }) => {
	const { getValues } = formHook || {};
	const { cargo_insurance_policy_id = '' } = policyDetails || {};

	const { user } = useSelector((state) => state.profile);

	const [{ loading: getLoading, data: draftData }] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/details',
		authKey : 'get_saas_insurance_v2_details',
		params  : {
			policyId: cargo_insurance_policy_id,
		},
	}, { manual: !cargo_insurance_policy_id });

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/draft',
		authKey : 'post_saas_insurance_v2_draft',
	}, { manual: true });

	const saveAsDraft = async () => {
		const payload = getPayloadForSaveAsDraft({
			draftData,
			getValues,
			formRef,
			billingType,
			performedBy : user?.id,
			policyId    : cargo_insurance_policy_id,
		});

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Saved as Draft');
		} catch (error) {
			Toast.error(error.response?.data?.message);
		}
	};

	return {
		draftData, getLoading, saveAsDraft, saveDraftLoading: loading,
	};
};

export default useDraft;
