import { useRequest } from '@cogoport/request';

import toastApiError from '../utlis/toastApiError';

const useValidateTermsAndCondition = ({ refetch, organizationId }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/validate_terms_and_condition',
	}, { manual: true });

	const onValdidateSubmit = async (values = {}) => {
		try {
			const {
				service,
				shipping_line_id,
				airline_id,
				trade_type,
				country_id,
				paying_party_country_ids,
			} = values;
			const payload = {
				service,
				trade_type               : trade_type || undefined,
				airline_id               : airline_id || undefined,
				shipping_line_id         : shipping_line_id || undefined,
				organization_id          : organizationId,
				country_id               : country_id || undefined,
				paying_party_country_ids : paying_party_country_ids || undefined,
			};

			await trigger({
				data: payload,
			});
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		onValdidateSubmit,
		validateLoading: loading,
	};
};

export default useValidateTermsAndCondition;
