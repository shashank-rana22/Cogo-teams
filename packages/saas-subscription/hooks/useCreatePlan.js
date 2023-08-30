import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';

const useCreatePlan = ({ closeModal }) => {
	const { t } = useTranslation(['saasSubscription']);

	const profile = useSelector((state) => state.profile || {});

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_saas_custom_subscription',
	}, { manual: true });

	const createPlan = async (obj) => {
		const { display_name = '', frequencyPeriod = '' } = obj || {};

		const plan_name = display_name.toLowerCase().replace(/\s/g, '-');
		try {
			await trigger({
				data: {
					...obj,
					plan_name,
					performed_by_id  : profile?.id,
					frequency_period : frequencyPeriod,
				},
			});
			closeModal(false);
			Toast.success(t('saasSubscription:create_plan_success'));
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return { createPlan, loading };
};

export default useCreatePlan;
