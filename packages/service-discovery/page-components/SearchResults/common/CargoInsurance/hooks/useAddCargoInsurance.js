import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useAddCargoInsurance = ({
	checkout_id = '',
	refetch = () => {},
	setAddCargoInsurance = () => {},
	setDone = () => {},
	rateData = {},
	commodity = '',
	transitMode = '',
	spot_search_id = '',
	origin_country_id = '',
	destination_country_id = '',
	trade_type = '',
}) => {
	const url = checkout_id ? '/create_checkout_service' : '/create_spot_search_service';

	const key = checkout_id ? 'cargo_insurance_services_attributes' : 'cargo_insurance_services';

	const [{ loading }, trigger] = useRequest({
		method: 'POST',
		url,
	}, { manual: true });

	const handleAddCargoInsurance = async (values) => {
		const {
			cargo_value = '',
			cargo_value_currency = '',
			cargo_insurance_commodity = '',
			cargo_insurance_commodity_description = '',
		} = values;

		const payload = {
			id      : spot_search_id || checkout_id,
			service : 'cargo_insurance',
			[key]   : [
				{
					risk_coverage                : 'all_risk',
					trade_type,
					transit_mode                 : `${transitMode}`.toLowerCase(),
					cargo_value,
					cargo_value_currency,
					cargo_insurance_commodity_id : cargo_insurance_commodity,
					origin_country_id,
					destination_country_id,
					commodity,
					cargo_insurance_commodity_description,
					status                       : 'active',
					saas_rate                    : { ...rateData },
				},
			],
		};

		try {
			await trigger({ data: payload });

			Toast.success('Cargo Insurance added successfully!');
			setDone(true);
			setAddCargoInsurance(false);
			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		handleAddCargoInsurance,
		addCargoLoading: loading,
	};
};

export default useAddCargoInsurance;
