import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

import getDiscountControls from '../configuration/discountControls';

const getDefaultValue = ({ info, isCreate = false }) => {
	const { service_name, config_type, value, usage_count, metadata, conditions, is_active } = info || {};

	if (isCreate) return {};

	return {
		service_name,
		config_type,
		value,
		usage_count,
		metadata  : JSON.stringify(metadata),
		conditions,
		is_active : is_active ? 'active' : 'inactive',
	};
};

const usePlanDiscount = ({ discountModal = {}, setFeatureModal, setDiscountModal }) => {
	const { info, isCreate = false, planId = '' } = discountModal || {};
	const { unit } = info || {};

	const { t } = useTranslation(['saasSubscription']);

	const defaultValues = getDefaultValue({ info, isCreate });

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/update_saas_plan_discount_config',
	}, { manual: true });

	const [{ loading: createLoading }, createTrigger] = useRequest({
		method : 'POST',
		url    : '/create_saas_plan_discount_config',
	}, { manual: true });

	const apiTrigger = isCreate ? createTrigger : trigger;

	const formHook = useForm({ defaultValues });
	const { watch } = formHook;
	const watchConfig = watch('config_type');

	const discountControls = getDiscountControls({ isCreate, watchConfig, unit, t });

	const createUpdatePlanDiscount = async (payload) => {
		try {
			await apiTrigger({
				data: payload,
			});

			Toast.success(t('saasSubscription:discount_success_toast'));
			setFeatureModal({ apiCall: true });
			setDiscountModal({ open: false });
		} catch (err) {
			console.log(err, 'err');
		}
	};

	const submitHandler = (data) => {
		const { metadata, value, is_active } = data || {};
		const { service_name = '', config_type = '', id = '' } = info || {};

		const extraInfo = { id, unit, config_type, service_name };

		try {
			const validaMetadata = JSON.parse(metadata);
			const payload = {
				...data,
				is_active : is_active === 'active',
				value     : +value,
				metadata  : validaMetadata,
				...(!isCreate ? extraInfo : { saas_plan_id: planId, unit: 'percentage' }),
			};

			createUpdatePlanDiscount(payload);
		} catch (err) {
			Toast.error(t('saasSubscription:discount_invalid_metadata'));
		}
	};

	return {
		loading: loading || createLoading, submitHandler, formHook, discountControls,
	};
};

export default usePlanDiscount;
