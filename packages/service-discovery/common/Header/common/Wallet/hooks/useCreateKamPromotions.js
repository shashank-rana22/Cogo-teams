import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

import usePublishKamPromotion from './usePublishKamPromotion';

const FIRST_INDEX = 1;

const useCreateKamPromotion = ({ setShowSuccessModal = () => {}, refetchStats = () => {}, onClose = () => {} }) => {
	const [{ data: promotionData, loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/create_kam_promotion',
	}, { manual: true });

	const { publishPromotion } = usePublishKamPromotion();

	const generatePromotion = async (data) => {
		const {
			organization_id = '',
			service_type = '',
			purchased_type = '',
			max_amount = {},
			terms_and_conditions = [],
		} = data;

		try {
			const service = service_type.split('$$');
			const validServices = [
				'ftl_freight',
				'trailer_freight',
				'ltl_freight',
				'haulage_freight',
			];
			const checkTradeType = validServices.includes(service[GLOBAL_CONSTANTS.zeroth_index]);
			const payload = {
				organization_id,
				service_type : service[GLOBAL_CONSTANTS.zeroth_index],
				trade_type   : checkTradeType ? 'domestic' : service[FIRST_INDEX],
				rate_sources : purchased_type,
				discounts    : [
					{
						unit            : 'flat',
						value           : max_amount.price,
						amount_currency : max_amount.currency,
					},
				],
				terms_and_conditions: terms_and_conditions.map((item) => item.term),
			};

			const res = await trigger({ data: payload });

			await publishPromotion(res?.data?.id);

			onClose();
			setShowSuccessModal(true);
			refetchStats();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		loading,
		generatePromotion,
		promotionData,
	};
};

export default useCreateKamPromotion;
