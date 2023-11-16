import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

import incotermMapping from '../constants/inco-terms.json';

const getPayload = ({ values = {}, shipmentData = {}, primary_service = {}, commodity = '', rateData = {} }) => {
	const { trade_type = '', destination_country_id	= '', origin_country_id = '' } = primary_service || {};

	const {
		cargo_value, cargo_value_currency, country_id, cargo_insurance_commodity,
		cargo_insurance_commodity_description,
	} = values || {};

	const {
		importer_exporter_id, inco_term = '',
		importer_exporter_branch_id, id, importer_exporter_poc_id,
	} =	shipmentData || {};

	const incotermInfo = incotermMapping.find((ele) => ele.value === inco_term);

	return {
		search_type                         : 'cargo_insurance',
		source                              : 'upsell',
		importer_exporter_id,
		importer_exporter_branch_id,
		user_id                             : importer_exporter_poc_id,
		source_id                           : id,
		cargo_insurance_services_attributes : [
			{
				risk_coverage                : 'all_risk',
				trade_type                   : trade_type || incotermInfo?.tradeType,
				transit_mode                 : 'air',
				cargo_value,
				cargo_value_currency,
				cargo_insurance_commodity_id : cargo_insurance_commodity,
				cargo_insurance_country_id   : country_id,
				origin_country_id,
				destination_country_id,
				commodity                    : `${commodity?.commodity}(${commodity?.subCommodity})`,
				cargo_insurance_commodity_description,
				status                       : 'active',
				saas_rate                    : { ...rateData },
			},
		],
	};
};

const useInsuranceSpotSearch = ({
	shipmentData = {},
	rateData = {},
	commodity = '',
	refetch = () => {},
	primary_service,
}) => {
	const { query } = useRouter();

	const { importer_exporter_id } = shipmentData || {};

	console.log(shipmentData, 'shipmentData');

	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search',
		method : 'post',
	}, { manual: true });

	const onSuccess = (res) => {
		Toast.success('Cargo Insurance added successfully!');
		refetch();

		const ORIGIN = window.location.origin;
		const PARTNER_ID = query?.partner_id;
		const href = `${ORIGIN}/${PARTNER_ID}/book/${res?.data?.id}/${importer_exporter_id}`;

		window.location.href = href;
		window.sessionStorage.setItem('shipment_type', shipmentData?.shipment_type);
	};

	const handleAddCargoInsurance = async (values) => {
		try {
			const payload = getPayload({ values, primary_service, rateData, shipmentData, commodity });

			const res = await trigger({
				data: { ...payload },
			});
			onSuccess(res);
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return {
		handleAddCargoInsurance,
		cargoLoading: loading,
	};
};

export default useInsuranceSpotSearch;
