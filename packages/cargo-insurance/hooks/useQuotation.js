import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const getPayload = ({ data = {}, selectedRates = {} }) => ({
	...data,
	...selectedRates,
});

function useQuotation() {
	const [{ loading, data }, trigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/insurance/v2/send/quote',
		authKey : 'post_saas_insurance_v2_send_quote',
	}, { manual: true });

	const sendQuotation = (values) => {
		const payload = getPayload({ data: values });
		try {
			trigger({
				data: payload,
			});
		} catch (err) {
			console.log(err, 'err');
			Toast.error(err.response?.data?.message);
		}
	};

	console.log(data, 'data');

	return {
		loading, sendQuotation,
	};
}

export default useQuotation;
