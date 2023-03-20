import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import { getPanHolderStatus } from '../utils/getPanHolderStatus';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

const useGetBusiness = (props) => {
	const {
		general: { scope },
	} = useSelector((reduxState) => reduxState);

	if (!isEmpty(props?.addressData) && props?.source === 'addressPage') {
		return {};
	}

	const {
		watchTaxNumber = '',
		watchBusinessName = '',
		setValues = () => {},
		registrationNumberType = '',
	} = props;

	const getBusinessApi = useRequest('get', false, scope)('/get_business');

	const getGstAddress = async () => {
		try {
			const response = await getBusinessApi.trigger({
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

			const companyBasedOnPanNumber =				registrationNumberType === 'registration'
				? getPanHolderStatus(watchTaxNumber)
				: business_type || '';

			if (watchTaxNumber.length === 10) {
				setValues({
					business_name : business_name || watchBusinessName || '',
					company_type  : companyBasedOnPanNumber,
				});
			} else if (watchTaxNumber.length === 15) {
				setValues({
					tax_number : watchTaxNumber,
					pincode    : (!isEmpty(addresses) && (addresses[0] || {}).pincode) || '',
					address    : (!isEmpty(addresses) && (addresses[0] || {}).address) || '',
					name       : trade_name || business_name || '',
				});
			} else {
				setValues({
					tax_number    : '',
					pincode       : '',
					address       : '',
					name          : '',
					business_name : '',
					company_type  : '',
				});
			}
		} catch (error) {
			// console.log('error :: ', error);
		}
	};

	const onBlurTaxPanGstinControl = () => {
		if (
			registrationNumberType === ''
			|| ![10, 15].includes(watchTaxNumber.length)
		) {
			return;
		}

		getGstAddress();
	};

	useEffect(() => {
		if (registrationNumberType === 'tax') {
			onBlurTaxPanGstinControl();
		}
		if (watchTaxNumber === 'GST_NOT_FOUND') {
			getGstAddress();
		}
	}, [watchTaxNumber]);

	return {
		getBusinessApi,
		onBlurTaxPanGstinControl,
	};
};

export default useGetBusiness;
