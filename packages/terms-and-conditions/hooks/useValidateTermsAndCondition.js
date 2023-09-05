import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useValidateTermsAndCondition = (props) => {
	const { setTncLevel, organizationId } = props;

	console.log(props, 'propss');
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [{ data, loading, error }, trigger] = useRequest({ method: 'post', scope, url: '/validate_terms_and_condition' });
	console.log(error);
	const onSubmit = async (values = {}) => {
		try {
			const {
				service,
				shipping_line_id,
				airline_id,
				trade_type,
				country_id,
				paying_party_country_ids,
			} = values;
			console.log('values', values);
			const payload = {
				service,
				trade_type               : trade_type || undefined,
				airline_id               : airline_id || undefined,
				shipping_line_id         : shipping_line_id || undefined,
				organization_id          : organizationId,
				country_id               : country_id || undefined,
				paying_party_country_ids : undefined,
			};

			await trigger({
				data: payload,
			});

			console.log(data, 'data');

			setTncLevel('termsAndCondition');
		} catch (error) {
			console.log(error);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useValidateTermsAndCondition;
