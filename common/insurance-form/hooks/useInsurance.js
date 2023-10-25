import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';

const getPayload = ({ data = {}, organization, formValueRef, activeTab, user = {} }) => {
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
		performedBy: user?.id,
	};
};

const useInsurance = ({ activeTab, organization = {}, formValues = {}, setActiveTab }) => {
	const { push } = useRouter();

	const { t } = useTranslation(['cargoInsurance']);
	const { user } = useSelector((state) => state.profile);

	const formValueRef = useRef({});

	const formHook = useForm();
	const { watch, setValue, setError, clearErrors } = formHook;

	const { origin_point, destination_point } = watch();

	const [{ loading }, trigger] = useRequestBf({
		method  : 'post',
		url     : 'saas/insurance/v2/search-rate',
		authKey : 'get_saas_insurance_v2_search_rate',
	}, { manual: true });

	const verifyDetails = async (info) => {
		const payload = getPayload({ data: info, formValueRef, organization, activeTab, user });

		try {
			const resp = await trigger({
				data: payload,
			});

			const { data } = resp || {};
			push(`/cargo-insurance/${data?.id}`);
		} catch (err) {
			Toast.error(err.response?.data?.message);
		}
	};

	const onSubmit = (data) => {
		if (isEmpty(organization?.organization_id)) {
			Toast.error(t('cargoInsurance:err_msg_org'));
			return;
		}
		if (isEmpty(organization?.user_id)) {
			Toast.error(t('cargoInsurance:err_msg_user'));
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
				errorMessage = t('cargoInsurance:err_msg_same_point');
			} else if (activeTab === 'ocean' && refOrigin.country.id === refDestination.country.id) {
				errorMessage = t('cargoInsurance:err_msg_same_country');
			}

			if (errorMessage) {
				Toast.error(errorMessage);
				setError('destination_point', { type: 'custom', message: t('cargoInsurance:err_msg_dest') });
			} else {
				clearErrors('destination_point');
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [destination_point, origin_point, setError]);

	useEffect(() => {
		if (!isEmpty(formValues)) {
			const prefilValueHash = {
				origin_point      : formValues?.origin,
				destination_point : formValues?.destination,
				hsCode            : formValues?.hsCode,
				currency          : formValues?.invoiceCurrency,
				cargoValue        : formValues?.invoiceValue,
			};

			Object.entries(prefilValueHash).forEach(([controlKey, value]) => {
				setValue(controlKey, value);
			});

			setActiveTab(formValues?.transitMode);
			formValueRef.current.origin_point = formValues?.metadata?.origin;
			formValueRef.current.destination_point = formValues?.metadata?.destination;
		}
	}, [formValues, setValue, setActiveTab]);

	return { formHook, onSubmit, formValueRef, loading };
};

export default useInsurance;
