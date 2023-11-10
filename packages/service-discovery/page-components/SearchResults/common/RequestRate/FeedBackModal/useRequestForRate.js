import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';

import getSubsidiarySource from './getSubsidiarySource';

const URL = '/create_spot_search_rate_request';

const SUBSIDIARY_SERVICES = ['EDE', 'EDT', 'DET', 'DEA'];

const SERVICE_MAPPING = {
	rail_domestic_freight : 'rail_domestic_freight_rate_free_day',
	fcl_freight           : 'fcl_freight_rate_free_day',
};

const useRequestForRate = ({
	onClose,
	reset,
	data,
	details,
	requestService,
}) => {
	const router = useRouter();

	const [{ loading = false }, trigger] = useRequest({
		method : 'POST',
		url    : URL,
	}, { manual: true });

	const { query = {} } = router;
	const { spot_search_id = '' } = query;

	const { service_data = {} } = requestService;

	const handleResponse = () => {
		onClose();
		Toast.success('Your request has been submitted');
		reset();
	};

	const onSubmitFeedback = async (values = {}) => {
		const {
			preferred_airline_ids = undefined,
			preferred_freight_rate = undefined,
			preferred_freight_rate_currency = undefined,
			remarks = undefined,
			preferred_shipping_line_ids = undefined,
			cargo_readiness_date = undefined,
			file = [],
			commodity_description = undefined,
		} = values;

		const attachment_file_urls = (file || []).map((item) => item.url || item.finalUrl || item);

		const reefer_commodity_description = values?.temperature
			? `temperature: ${values.temperature}C | humidity: 
			${values.humidity}% | ventilation: ${values.ventilation}%` : '';

		try {
			if ((preferred_freight_rate && !preferred_freight_rate_currency)
			|| (preferred_freight_rate_currency && !preferred_freight_rate)) {
				if (!preferred_freight_rate_currency) {
					Toast.error('Please add currency');
				} else Toast.error('Please add rate');
			} else {
				const subsidiary_source = getSubsidiarySource({
					service_data,
					data,
				});

				const commodityDescription = reefer_commodity_description
					? `${reefer_commodity_description} ${commodity_description}` : commodity_description;

				const body = {
					id                          : spot_search_id || details?.source_id,
					commodity_description       : commodityDescription || undefined,
					remarks                     : remarks ? [remarks] : undefined,
					performed_by_org_id         : details.importer_exporter.id,
					preferred_shipping_line_ids : !isEmpty(preferred_shipping_line_ids)
						? preferred_shipping_line_ids : undefined,
					preferred_airline_ids  : !isEmpty(preferred_airline_ids) ? preferred_airline_ids : undefined,
					preferred_freight_rate : preferred_freight_rate || undefined,
					preferred_freight_rate_currency:
						preferred_freight_rate_currency || undefined,
					specificity_type:
						service_data?.service_type === 'subsidiary'
						&& SUBSIDIARY_SERVICES.includes(service_data?.code)
							? subsidiary_source?.specificity_type
							: undefined,
					preferred_total_days:
						Number(service_data?.total_rate_quantity) || undefined,
					preferred_free_days:
						Number(subsidiary_source?.preferred_free_days) || undefined,
					cargo_readiness_date: cargo_readiness_date || undefined,
					service_id:
						service_data?.service_type === 'subsidiary'
						&& SUBSIDIARY_SERVICES.includes(service_data?.code)
							? subsidiary_source?.service_id || undefined
							: requestService?.service_id || undefined,
					service_type:
						service_data?.service_type === 'subsidiary'
						&& SUBSIDIARY_SERVICES.includes(service_data?.code)
							? SERVICE_MAPPING[data?.service_type]
							: requestService?.service_type || undefined,
					selected_card           : requestService?.selected_card || undefined,
					attachment_file_urls    : !isEmpty(attachment_file_urls) ? attachment_file_urls : undefined,
					free_days_type          : subsidiary_source?.free_days_type || undefined,
					subsidiary_service_code : service_data?.code || undefined,
				};

				await trigger({ data: body });

				handleResponse();
			}
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		onSubmitFeedback,
		loading,
	};
};

export default useRequestForRate;
