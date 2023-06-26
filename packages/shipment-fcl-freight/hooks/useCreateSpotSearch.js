import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useCreateSpotSearch = ({
	data = {},
	rateData = {},
	commodity = '',
	transitMode = '',
	primary_service = {},
	trade_type = '',
	refetch = () => {},
	successMessage = 'Cargo Insurance added successfully!',
}) => {
	const router = useRouter();

	const { origin_country_id = '', destination_country_id = '' } =		primary_service;

	const { user_id, importer_exporter_id, importer_exporter_branch_id, id } =		data || {};

	const [{ loading, data: res }, trigger] = useRequest({
		url    : '/create_spot_search',
		method : 'POST',
	}, { manual: true });

	const handleAddCargoInsurance = async (values) => {
		const payload = {
			search_type                         : 'cargo_insurance',
			source                              : 'upsell',
			importer_exporter_id,
			importer_exporter_branch_id,
			user_id,
			source_id                           : id,
			cargo_insurance_services_attributes : [
				{
					risk_coverage                : 'all_risk',
					trade_type,
					transit_mode                 : `${transitMode}`.toLowerCase(),
					cargo_value                  : values.cargo_value,
					cargo_value_currency         : values.cargo_value_currency,
					cargo_insurance_commodity_id : values.cargo_insurance_commodity,
					cargo_insurance_country_id   : values.country_id,
					origin_country_id,
					destination_country_id,
					commodity,
					cargo_insurance_commodity_description:
						values.cargo_insurance_commodity_description,
					status    : 'active',
					saas_rate : { ...rateData },
				},
			],
		};

		try {
			trigger({
				data: payload,
			});

			Toast.success(successMessage);
			refetch();
			const HREF = '/book/[search_id]/[importer_exporter_id]';
			const as = `/book/${res?.data?.id}/${importer_exporter_id}`;
			router.push(HREF, as);
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
