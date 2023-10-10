import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef } from 'react';

const getPayload = ({ data = {}, organization, formValueRef, activeTab }) => {
	const { cargoValue, currency, hsCode } = data || {};
	const { user_id, organization_id } = organization || {};
	const { origin_point: refOrigin, destination_point: refDestination } = formValueRef.current || {};

	return {
		userId         : user_id,
		organizationId : organization_id,
		source         : 'ADMIN',
		metadata       : {
			origin      : refOrigin,
			destination : refDestination,
			transitMode : activeTab,
		},
		rate: {
			hsCode,
			invoiceValue         : cargoValue,
			invoiceCurrency      : currency,
			originCountryId      : refOrigin?.country_id,
			destinationCountryId : refDestination?.country_id,
		},
	};
};

const useInsurance = ({ activeTab, organization = {}, formValues = {}, setActiveTab }) => {
	const { push, query } = useRouter();

	const formValueRef = useRef({});

	const formHook = useForm();
	const { watch, setValue, setError, clearErrors } = formHook;

	const { origin_point, destination_point } = watch();

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/insurance/v2/search-rate',
		authKey : 'get_saas_insurance_v2_search-rate',
	}, { manual: true });

	const verifyDetails = async (info) => {
		const payload = getPayload({ data: info, formValueRef, organization, activeTab });

		try {
			const resp = await trigger({
				data: {
					...payload,
					performedBy: query?.partner_id,
				},
			});

			const { data } = resp || {};
			push(`/cargo-insurance/${data?.id}`);
		} catch (err) {
			Toast.error(err.response?.data?.message);
		}
	};

	const onSubmit = (data) => {
		if (isEmpty(organization?.organization_id)) {
			Toast.error('Please Select Organization');
			return;
		}
		if (isEmpty(organization?.user_id)) {
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

	useEffect(() => {
		if (!isEmpty(formValues)) {
			setActiveTab(formValues?.transitMode);
			setValue('origin_point', formValues?.origin);
			setValue('destination_point', formValues?.destination);
			setValue('hsCode', formValues?.hsCode);
			setValue('currency', formValues?.invoiceCurrency);
			setValue('cargoValue', formValues?.invoiceValue);
		}
	}, [formValues, setValue, setActiveTab]);

	return { formHook, onSubmit, formValueRef, loading };
};

export default useInsurance;
