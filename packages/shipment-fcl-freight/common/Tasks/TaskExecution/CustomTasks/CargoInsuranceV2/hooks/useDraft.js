import { useRequestBf } from '@cogoport/request';

const useDraft = ({ policyDetails = {} }) => {
	const { cargo_insurance_policy_id = '' } = policyDetails || {};

	console.log(cargo_insurance_policy_id, 'cargo_insurance_policy_id');

	const [{ loading: getLoading, data: draftData }] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/details',
		authKey : 'get_saas_insurance_v2_details',
		params  : {
			policyId: cargo_insurance_policy_id,
		},
	}, { manual: !cargo_insurance_policy_id });

	return {
		draftData, getLoading,
	};
};

export default useDraft;
