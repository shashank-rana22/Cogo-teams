import getPanHolderStatus from '@cogoport/forms/utils/getPanHolderStatus';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const PAN_LENGTH = 10;

const GST_LENGTH = 15;

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

const useGetBusiness = (props) => {
	const {
		watchTaxNumber = '',
		watchBusinessName = '',
		setValue = () => {},
		registrationNumberType = '',
		action = '',
	} = props;

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_business',
			method : 'get',
		},
		{ manual: true },
	);

	const getGstAddress = useCallback(async () => {
		try {
			const response = await trigger({
				params: {
					identity_number : watchTaxNumber,
					identity_type   : registrationNumberType,
					country_code    : INDIA_COUNTRY_CODE,
					provider_name   : 'cogoscore',
				},
			});

			const {
				addresses = [],
				trade_name = '',
				business_name = '',
				business_type = '',
			} = response.data || {};

			const companyBasedOnPanNumber =	registrationNumberType === 'registration'
				? getPanHolderStatus(watchTaxNumber)
				: business_type || '';

			if (watchTaxNumber.length === PAN_LENGTH) {
				setValue('business_name', business_name || watchBusinessName || '');
				setValue('company_type', companyBasedOnPanNumber);
			}

			if (watchTaxNumber.length === GST_LENGTH) {
				setValue('tax_number', watchTaxNumber);
				setValue(
					'pincode',
					(!isEmpty(addresses)
						&& (addresses[GLOBAL_CONSTANTS.zeroth_index] || {}).pincode)
						|| '',
				);
				setValue(
					'address',
					(!isEmpty(addresses)
						&& (addresses[GLOBAL_CONSTANTS.zeroth_index] || {}).address)
						|| '',
				);
				setValue('name', trade_name || business_name || '');
			}
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [
		registrationNumberType,
		setValue,
		trigger,
		watchBusinessName,
		watchTaxNumber,
	]);

	const onBlurTaxPanGstinControl = useCallback(() => {
		if (
			registrationNumberType === ''
			|| ![PAN_LENGTH, GST_LENGTH].includes(watchTaxNumber.length)
		) {
			return;
		}

		getGstAddress();
	}, [getGstAddress, registrationNumberType, watchTaxNumber.length]);

	useEffect(() => {
		if (action === 'edit') {
			return;
		}
		if (registrationNumberType === 'tax') {
			onBlurTaxPanGstinControl();
		}
		if (watchTaxNumber === 'GST_NOT_FOUND') {
			setValue('tax_number', '');
			setValue('pincode', '');
			setValue('address', '');
			setValue('name', '');
			setValue('business_name', '');
			setValue('company_type', '');
		}
	}, [
		action,
		onBlurTaxPanGstinControl,
		registrationNumberType,
		setValue,
		watchTaxNumber,
	]);

	return {
		getBusinessApi: { loading },
		onBlurTaxPanGstinControl,
	};
};

export default useGetBusiness;
