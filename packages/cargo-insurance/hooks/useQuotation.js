import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

const getPayload = ({ data = {}, userId = '' }) => {
	const { firstName, lastName, email } = data || {};
	return ({
		pocName     : `${firstName} ${lastName}`,
		pocEmail    : email,
		performedBy : userId,
	});
};

function useQuotation({ pocDetails = {} }) {
	const { query } = useRouter();
	const { policySearchId } = query || {};

	const { t } = useTranslation(['cargoInsurance']);

	const { user } = useSelector((state) => state.profile);

	const formhook = useForm();
	const { setValue } = formhook;

	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/send/quote',
		authKey : 'post_saas_insurance_v2_send_quote',
	}, { manual: true });

	const sendQuotation = async (values) => {
		const payload = getPayload({ data: values, userId: user?.id });
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

	const submitHandler = (values) => {
		const { phoneNo } = values || {};

		if (!phoneNo?.country_code) {
			Toast.error(t('cargoInsurance:draft_err_mobile'));
			return;
		}
		sendQuotation(values);
	};

	useEffect(() => {
		if (!isEmpty(pocDetails)) {
			const prefilValueHash = {
				firstName : pocDetails?.insuredFirstName,
				lastName  : pocDetails?.insuredLastName,
				email     : pocDetails?.email,
				phoneNo   : { country_code: pocDetails?.phoneCode, number:	pocDetails?.phoneNo },
			};

			Object.entries(prefilValueHash).forEach(([controlKey, value]) => {
				setValue(controlKey, value);
			});
		}
	}, [pocDetails, setValue]);

	return {
		loading, data, formhook, submitHandler,
	};
}

export default useQuotation;
