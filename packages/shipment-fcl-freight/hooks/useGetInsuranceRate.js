import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetInsuranceRate = ({ insuranceDetails = {}, formValues = {} }) => {
	const userId = useSelector(({ profile }) => profile?.id);
	const {
		cargoAmount,
		policyCurrency,
		cargoDescription,
		policyCountryId,
		policyCommodityId,
	} = formValues || insuranceDetails;

	const [{ loading, data }, trigger] = useRequestBf({
		auth   : 'get_saas_insurance_rate',
		url    : 'saas/insurance/rate',
		method : 'GET',
		params : {
			performedBy        : userId,
			policyType         : insuranceDetails?.policyType,
			descriptionOfCargo : cargoDescription,
			policyCountryId,
			policyCommodityId,
			policyCurrency,
			invoiceValue       : cargoAmount,
		},
	}, { manual: true });

	const premiumRate = useCallback(async () => {
		try {
			await trigger({});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (!isEmpty(cargoAmount) && !isEmpty(policyCurrency)) {
			premiumRate();
		}
	}, [cargoAmount, policyCurrency, premiumRate]);

	useEffect(() => {
		if (cargoAmount && !isEmpty(policyCurrency)) {
			premiumRate();
		}
	}, [cargoAmount, policyCurrency, premiumRate]);

	return {
		premiumLoading : loading,
		premiumData    : data,
	};
};
export default useGetInsuranceRate;
