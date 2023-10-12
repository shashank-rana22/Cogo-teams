import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useRef } from 'react';

import { getPayloadForDraft, getPayloadForSaveAsDraft } from '../helper/saveDraftPayload';

function useDraft({ data = {}, getValues = () => {}, formRef = {}, billingType = '' }) {
	const { query, push } = useRouter();
	const { policySearchId = '', draftId = '' } = query;

	const { user } = useSelector((state) => state.profile);

	const personalDetailRef = useRef({});

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/draft',
		authKey : 'post_saas_insurance_v2_draft',
	}, { manual: true });

	const [{ loading: getLoading, data: draftData }] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/details',
		authKey : 'get_saas_insurance_v2_details',
		params  : {
			policyId: draftId,
		},
	}, { manual: !draftId });

	const saveDraft = async ({ pocDetails }) => {
		const payload = getPayloadForDraft({ data, pocDetails, performedBy: user?.id, policySearchId });
		try {
			const resp = await trigger({
				data: payload,
			});
			const { id } = resp?.data || {};
			push(`/cargo-insurance/${policySearchId}/${id}`);
		} catch (error) {
			Toast.error(error.response?.data?.message);
		}
	};

	const saveAsDraft = async () => {
		const payload = getPayloadForSaveAsDraft({
			draftData,
			getValues,
			formRef,
			billingType,
			performedBy: user?.id,
			draftId,
		});

		try {
			await trigger({
				data: payload,
			});
			Toast.success('Draft Saved successfully');
		} catch (error) {
			Toast.error(error.response?.data?.message);
		}
	};

	const submitHandler = async () => {
		const resp = await personalDetailRef.current.getPersonalDetails();

		const { hasError, phoneNo } = resp || {};

		if (hasError) {
			Toast.error('Please fill all personal details');
			return;
		}

		if (!phoneNo?.country_code) {
			Toast.error('Please Select Mobile Code');
			return;
		}
		saveDraft({ pocDetails: resp });
	};

	return {
		loading, submitHandler, personalDetailRef, getLoading, draftData, saveAsDraft,
	};
}

export default useDraft;
