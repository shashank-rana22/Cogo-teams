import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

const getPayload = ({ data = {} }) => {
	const { firstName, lastName, email } = data || {};
	return ({
		pocName  : `${firstName} ${lastName}`,
		pocEmail : email,
	});
};

function useQuotation({ pocDetails = {} }) {
	const { query } = useRouter();
	const { policySearchId } = query || {};

	const { t } = useTranslation(['cargoInsurance']);

	const formhook = useForm();
	const { setValue } = formhook;

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/send/quote',
		authKey : 'post_saas_insurance_v2_send_quote',
	}, { manual: true });

	const sendQuotation = async (values) => {
		const payload = getPayload({ data: values });
		try {
			await trigger({
				data: {
					...payload,
					policySearchId,
				},
			});
			Toast.success(t('cargoInsurance:quote_send_success'));
		} catch (err) {
			Toast.error(err.response?.data?.message);
		}
	};

	useEffect(() => {
		if (!isEmpty(pocDetails)) {
			setValue('firstName', pocDetails?.insuredFirstName);
			setValue('lastName', pocDetails?.insuredLastName);
			setValue('email', pocDetails?.email);
			setValue('phoneNo', { country_code: pocDetails?.phoneCode, number:	pocDetails?.phoneNo });
		}
	}, [pocDetails, setValue]);

	return {
		loading, sendQuotation, data, formhook,
	};
}

export default useQuotation;
