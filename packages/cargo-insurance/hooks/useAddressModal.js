import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import getAddressControls from '../configurations/addressControls';

const getPayload = ({ data, orgId, showPocFields }) => {
	const { country, poc_name, email, phoneNumber = {}, ...rest	} = data || {};
	const { country_code, number } = phoneNumber || {};
	return {
		country_id      : country,
		organization_id : orgId,
		poc_details     : showPocFields ? [{
			name                : poc_name,
			email,
			mobile_number       : number,
			mobile_country_code : country_code,
		}] : undefined,
		...rest,
	};
};

const useAddressModal = ({ orgId = '', setAddressModal, getBillingAddress }) => {
	const { t } = useTranslation(['cargoInsurance']);

	const [showPocFields, setShowPocFeilds] = useState(false);

	const [{ loading: apiLoading }, trigger] = useRequest({
		url    : '/create_organization_address',
		method : 'post',
	}, { manual: true });

	const [{ loading }, billingTrigger] = useRequest({
		url    : '/create_organization_billing_address',
		method : 'post',
	}, { manual: true });

	const formhook = useForm();
	const { watch, setValue } = formhook;

	const formValues = watch();
	const { includeTax, country } = formValues || {};

	const addressControl = getAddressControls({ t, includeTax, country, setValue, showPocFields, setShowPocFeilds });

	const createOrgAddress = async ({ payload }) => {
		const apiTrigger = includeTax ? billingTrigger : trigger;
		try {
			await apiTrigger({
				data: payload,
			});
			Toast.success(t('cargoInsurance:create_address_success'));
			return true;
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
			return false;
		}
	};

	const closeModalHandler = () => {
		setAddressModal({
			openModal: false,
		});
	};

	const submitHandler = async (data) => {
		const payload = getPayload({ data, orgId, showPocFields });

		const resp = await createOrgAddress({ payload });
		if (resp) {
			await getBillingAddress();
			closeModalHandler();
		}
	};

	useEffect(() => {
		if (!includeTax) { setShowPocFeilds(false); }
	}, [includeTax]);

	return { loading: apiLoading || loading, formhook, addressControl, submitHandler, closeModalHandler };
};

export default useAddressModal;
