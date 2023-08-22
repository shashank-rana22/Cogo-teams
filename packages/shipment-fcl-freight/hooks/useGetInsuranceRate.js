import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useGetInsuranceRate = ({ insuranceDetails = {}, formValues = {}, setPremiumData = () => {} } = {}) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};
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

	const premiumRate = useCallback(async (payload) => {
		try {
			const res = await trigger({ ...(payload && { params: { ...payload } }) });
			setPremiumData(res?.data);
		} catch (err) {
			setPremiumData({});
			toastApiError(err);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger]);

	useEffect(() => {
		if (!isEmpty(cargoAmount) && !isEmpty(policyCurrency)) {
			premiumRate();
		}
	}, [cargoAmount, policyCurrency, premiumRate]);

	return {
		premiumLoading : loading,
		premiumData    : data,
		premiumRate,
	};
};
export default useGetInsuranceRate;
