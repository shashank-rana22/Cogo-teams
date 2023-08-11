import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useCreateSpotSearch = ({
	shipmentData = {},
	rateData = {},
	commodity = '',
	transitMode = '',
	origin_country_id = '',
	destination_country_id = '',
	trade_type = '',
	refetch = () => {},
	successMessage = 'Cargo Insurance added successfully!',
}) => {
	const router = useRouter();

	const { importer_exporter_id, importer_exporter_branch_id, id, importer_exporter_poc_id } =	shipmentData || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search',
		method : 'POST',
	}, { manual: true });

	const handleAddCargoInsurance = async (values) => {
		const {
			cargo_value, cargo_value_currency, country_id, cargo_insurance_commodity,
			cargo_insurance_commodity_description,
		} = values || {};

		const payload = {
			search_type                         : 'cargo_insurance',
			source                              : 'upsell',
			importer_exporter_id,
			importer_exporter_branch_id,
			user_id                             : importer_exporter_poc_id,
			source_id                           : id,
			cargo_insurance_services_attributes : [
				{
					risk_coverage                : 'all_risk',
					trade_type,
					transit_mode                 : `${transitMode}`.toLowerCase(),
					cargo_value,
					cargo_value_currency,
					cargo_insurance_commodity_id : cargo_insurance_commodity,
					cargo_insurance_country_id   : country_id,
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
			const res = await trigger({
				data: payload,
			});
			Toast.success(successMessage);
			refetch();
			const ORIGIN = window.location.origin;
			const PARTNER_ID = router?.query?.partner_id;
			const href = `${ORIGIN}/${PARTNER_ID}/book/${res?.data?.id}/${importer_exporter_id}`;
			window.location.href = href;
			window.sessionStorage.setItem('shipment_type', shipmentData?.shipment_type);
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return {
		handleAddCargoInsurance,
		cargoLoading: loading,
	};
};

export default useCreateSpotSearch;
