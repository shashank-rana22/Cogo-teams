import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'react-i18next';

const usePlanValidity = ({ modalChangeHandler }) => {
	const { t } = useTranslation(['saasSubscription']);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_subscription_validity',
	}, { manual: true });

	const changePlanValidityHandler = async ({ id, endDate }) => {
		try {
			await trigger({
				data: {
					saas_subscription_id : id,
					validity_date        : endDate,
				},
			});
			Toast.success(t('saasSubscription:change_plan_validity'));
			modalChangeHandler(true);
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		loading, changePlanValidityHandler,
	};
};

export default usePlanValidity;
