import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

const getPayload = ({ data = {}, formValueRef }) => {
	const { cargoValue, currency, hsCode } = data || {};
	const { origin_point: refOrigin, destination_point: refDestination } = formValueRef.current || {};

	return {
		hsCode,
		cargoValue,
		cargoCurrency        : currency,
		originCountryId      : refOrigin?.country_id,
		destinationCountryId : refDestination?.country_id,
	};
};

const useInsurance = ({ activeTab, organization = {} }) => {
	const { push } = useRouter();
	const formValueRef = useRef({});

	const formHook = useForm();
	const { watch, setValue, setError, clearErrors } = formHook;

	const { origin_point, destination_point } = watch();

	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		url     : '/saas/insurance/v2/rate',
		authKey : 'get_saas_insurance_v2_rate',
	}, { manual: true });

	const verifyDetails = async (data) => {
		const payload = getPayload({ data, formValueRef });
		const { origin_point: refOrigin, destination_point: refDestination } = formValueRef.current || {};

		try {
			await trigger({
				params: payload,
			});
			const queryData = {
				...data,
				originName           : refOrigin?.display_name,
				destinationName      : refDestination?.display_name,
				originCountryId      : refOrigin?.country_id,
				destinationCountryId : refDestination?.country_id,
				type                 : activeTab,
				orgDetails           : organization,
			};
			push(`/cargo-insurance?data=${JSON.stringify(queryData)}`);
		} catch (err) {
			Toast.error(err.response?.data?.message);
		}
	};

	const onSubmit = (data) => {
		if (isEmpty(organization?.organization_id)) {
			Toast.error('Please Select Organization');
			return;
		}
		if (isEmpty(organization?.organization_id)) {
			Toast.error('Please Select User');
			return;
		}
		verifyDetails(data);
	};

	useEffect(() => {
		if (destination_point || origin_point) {
			setValue('origin_point', '');
			setValue('destination_point', '');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	useEffect(() => {
		if (origin_point && destination_point) {
			let errorMessage = '';
			const { origin_point: refOrigin, destination_point: refDestination } = formValueRef.current || {};

			if (origin_point === destination_point) {
				errorMessage = 'Origin and Destination Point cannot be the same';
			} else if (activeTab === 'ocean' && refOrigin.country.id === refDestination.country.id) {
				errorMessage = 'Origin and Destination Point cannot be of the same country';
			}

			if (errorMessage) {
				Toast.error(errorMessage);
				setError('destination_point', { type: 'custom', message: 'Select a different Destination Point' });
			} else {
				clearErrors('destination_point');
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [destination_point, origin_point, setError]);

	return { formHook, onSubmit, formValueRef, loading };
};

export default useInsurance;
