// import { useRequest } from '@cogo/commons/hooks';
// import { useSelector } from '@cogo/store';
// import getApiErrorString from '@cogo/utils/getApiErrorString';
// import { toast } from '@cogoport/front/components';

import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import transformMargins from '../utils/transformMargins';

const useUpdateRfqRateMargin = ({
	rate,
	details,
}) => {
	// const { scope } = useSelector(({ general, profile }) => ({
	// 	scope      : general.scope,
	// 	partner_id : profile.partner.id,
	// }));

	const endpoint = '/update_rfq_rate_card_margin';

	const [{ loading, data }, trigger] = useRequest({
		url    : endpoint,
		method : 'POST',
	}, { manual: false });

	// const { trigger } = useRequest('post', false, scope)(endpoint);

	const updateRfqRateMargin = async (item) => {
		try {
			const response = await trigger({
				data: {
					margins          : item?.margins,
					rfq_rate_card_id : item?.rfq_rate_card_id,
					card_state       : 'modified_and_sent',
				},
			});
			if (response?.status === 200) {
				Toast.success('Rate updated successfully');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	const updateMargin = async ({ editedMargins, convenienceDetails }) => {
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

		updateRfqRateMargin(editBody);
	};

	return {
		updateRfqRateMargin,
		updateMargin,
	};
};

export default useUpdateRfqRateMargin;
