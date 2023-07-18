import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useRouter } from 'next/router';

const URL = '/create_spot_search_rate_request';

const useRequestForRate = ({
	onClose,
	reset,
	data,
}) => {
	const router = useRouter();

	const [{ loading = false }, trigger] = useRequest({
		method : 'POST',
		url    : URL,
	}, { manual: true });

	const { query = {} } = router;
	const { spot_search_id = '' } = query;

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
			cargo_readiness_date = null,
			file = null,
			commodity_description = undefined,
		} = values;

		const attachment_file_urls = (file || []).map((item) => item.url);

		try {
			if (preferred_freight_rate && !preferred_freight_rate_currency) {
				Toast.error('Please add currency');
			} else {
				const body = {
					id                              : spot_search_id,
					commodity_description           : commodity_description || undefined,
					remarks                         : remarks ? [remarks] : undefined,
					performed_by_org_id             : data.importer_exporter.id,
					preferred_shipping_line_ids     : preferred_shipping_line_ids || undefined,
					preferred_airline_ids           : preferred_airline_ids || undefined,
					preferred_freight_rate          : preferred_freight_rate || undefined,
					preferred_freight_rate_currency : preferred_freight_rate_currency || undefined,
					cargo_readiness_date,
					attachment_file_urls,
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
