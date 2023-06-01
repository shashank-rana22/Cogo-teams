import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import transformMargins from '../utils/transformMargins';

const useUpdateRfqRateMargin = ({
	rate,
	details,
}) => {
	const endpoint = '/update_rfq_rate_card_margin';

	const [{ data }, trigger] = useRequest({
		url    : endpoint,
		method : 'POST',
	}, { manual: true });

	const updateRfqRateMargin = async ({ editBody, rfq_rate_card_id }) => {
		try {
			const response = await trigger({
				data: {
					margins    : editBody?.margins,
					rfq_rate_card_id,
					card_state : 'modified_and_sent',
				},
			});

			if (response?.status === 200) {
				Toast.success('Rate updated successfully');
			}

			return response;
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
		return null;
	};

	const updateMargin = async ({ editedMargins, convenienceDetails, rfq_rate_card_id = '' }) => {
		const updatedMargins = transformMargins({
			values   : editedMargins,
			services : rate?.service_rates,
			detail   : details,
		});
		const margins = {};

		Object.keys(updatedMargins).forEach((key) => {
			if (String(key).indexOf('-') > -1) {
				margins[key] = updatedMargins[key];
			}
		});

		const final_margins = {};
		Object.keys(margins).forEach((service) => {
			if (rate?.service_rates?.[service]) {
				final_margins[service] = margins[service];
			}
		});

		const editBody = {
			convenience_rate : convenienceDetails.convenience_rate,
			margins          : final_margins,
		};

		return updateRfqRateMargin({ editBody, rfq_rate_card_id });
	};

	return {
		updateRfqRateMargin,
		updateMargin,
	};
};

export default useUpdateRfqRateMargin;
