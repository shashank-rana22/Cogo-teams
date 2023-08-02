import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const ONE_VALUE = 1;
const DEFAULT_COUNT_VALUE = 0;

const URL = '/create_spot_search_rate_feedback';
const KEYS_TO_SEND = {
	fcl_freight     : 'preferred_freight_rate',
	ftl_freight     : 'preferred_freight_rate',
	air_freight     : 'preferred_freight_rate',
	ltl_freight     : 'preferred_freight_rate',
	lcl_freight     : 'preferred_freight_rate',
	fcl_customs     : 'preferred_customs_rate',
	lcl_customs     : 'preferred_customs_rate',
	air_customs     : 'preferred_customs_rate',
	haulage_freight : 'preferred_freight_rate',
	trailer_freight : 'preferred_freight_rate',
};
const KEYS_TO_SEND_CURR = {
	fcl_freight     : 'preferred_freight_rate_currency',
	ftl_freight     : 'preferred_freight_rate_currency',
	air_freight     : 'preferred_freight_rate_currency',
	ltl_freight     : 'preferred_freight_rate_currency',
	lcl_freight     : 'preferred_freight_rate_currency',
	fcl_customs     : 'preferred_customs_rate_currency',
	lcl_customs     : 'preferred_customs_rate_currency',
	air_customs     : 'preferred_customs_rate_currency',
	haulage_freight : 'preferred_freight_rate_currency',
	trailer_freight : 'preferred_freight_rate_currency',
};

const useDislikeFeedback = ({
	details = {},
	rate = {},
	likeState = {},
	setLikeState = () => {},
	onClose = () => {},
}) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { spot_search_id = '' } = query;

	const freight = rate.service_type;

	const [{ loading }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const onSubmitFeedback = async (values = {}) => {
		const keyToSend = KEYS_TO_SEND[freight];
		const keyCurrency = KEYS_TO_SEND_CURR[freight];
		const {
			preferred_freight_rate,
			preferred_freight_rate_currency,
			file_upload,
			...rest
		} = values;
		const attachment_file_urls = (file_upload || []).map((item) => item.finalUrl);

		try {
			if (preferred_freight_rate && !preferred_freight_rate_currency) {
				Toast.error('Please add currency');
			} else {
				const body = {
					id                    : spot_search_id,
					is_disliked           : true,
					...rest,
					preferred_airline_ids : values.preferred_airline_ids || undefined,
					preferred_shipping_line_ids:
						values.preferred_shipping_line_ids || undefined,
					remarks       : values.remarks ? [values.remarks] : undefined,
					[keyToSend]   : values.preferred_freight_rate || undefined,
					[keyCurrency] : values.preferred_freight_rate_currency || undefined,
					preferred_detention_free_days:
						values.preferred_detention_free_days || undefined,
					selected_card         : rate.card,
					performed_by_org_id   : details.importer_exporter.id,
					attachment_file_urls,
					commodity_description : values.commodity_description || undefined,
				};
				await trigger({ data: body });

				setLikeState({
					is_liked       : false,
					likes_count    : likeState.is_liked ? likeState.likes_count - ONE_VALUE : likeState.likes_count,
					is_disliked    : true,
					dislikes_count : (likeState.dislikes_count || DEFAULT_COUNT_VALUE) + ONE_VALUE,
				});

				onClose();
			}
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		onSubmitFeedback,
		loading,
	};
};

export default useDislikeFeedback;
