import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetInsuranceDraftDetails = ({
	policyId = '',
	step = '',
	setAddressId = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequestBf({
		auth   : '/get/saas/insurance_draft_details',
		url    : 'saas/insurance/draft/details',
		method : 'GET',
		params : {
			policyId,
		},
	}, { manual: true });

	const getInsuranceDetails = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getInsuranceDetails();
	}, [getInsuranceDetails, step]);

	useEffect(() => {
		if (isEmpty(data?.organizationBillingAddressId)) {
			setAddressId({
				organizationAddressId: data?.organizationAddressId,
			});
		} else {
			setAddressId({
				organizationBillingAddressId:
				data?.organizationBillingAddressId,
			});
		}
	}, [data?.organizationAddressId, data?.organizationBillingAddressId, setAddressId]);

	return {
		insuranceDetails : data,
		loading,
		getDetails       : getInsuranceDetails,
	};
};
export default useGetInsuranceDraftDetails;
