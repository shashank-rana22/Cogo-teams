import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

import getDiscountControls from '../configuration/discountControls';

const getDefaultValue = ({ info, isCreate = false }) => {
	const {
		service_name = '', config_type = '', value = '',
		usage_count = '', metadata = {}, conditions = '', is_active = false,
	} = info || {};

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

			Toast.success(isCreate ? t('saasSubscription:discount_create_success_toast')
				: t('saasSubscription:discount_success_toast'));

			setFeatureModal({ apiCall: true });
			setDiscountModal({ open: false });
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	const submitHandler = (data) => {
		const { metadata, conditions, value, is_active, to_all_subscribers = false, ...rest } = data || {};

		const { service_name = '', config_type = '', id = '' } = info || {};

		const extraInfo = { id, unit, config_type, service_name };

		try {
			const validMetadata = metadata ? JSON.parse(metadata) : null;
			const validConditions = conditions ? JSON.parse(conditions) : null;

			const payload = {
				...rest,
				is_active                        : is_active === 'active',
				value                            : +value,
				metadata                         : validMetadata,
				conditions                       : validConditions,
				refresh_for_existing_subscribers : isCreate ? to_all_subscribers : undefined,
				...(!isCreate
					? extraInfo
					: {
						unit         : 'percentage',
						saas_plan_id : planId,
					}),
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
