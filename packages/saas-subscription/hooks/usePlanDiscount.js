import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

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
	const { info, isCreate = false } = discountModal || {};

	const { t } = useTranslation(['saasSubscription']);

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/update_saas_plan_discount_config',
	}, { manual: true });

	const defaultValues = getDefaultValue({ info, isCreate });

	const formHook = useForm({ defaultValues });

	const updatePlanDiscount = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			setFeatureModal({ apiCall: true });
			Toast.success(t('saasSubscription:discount_success_toast'));
			setDiscountModal({ open: false });
		} catch (err) {
			console.log(err, 'err');
		}
	};

	const submitHandler = (data) => {
		const { metadata, value, is_active } = data || {};
		try {
			const validaMetadata = JSON.parse(metadata);
			const payload = {
				...data,
				is_active    : is_active === 'active',
				value        : +value,
				metadata     : validaMetadata,
				service_name : info?.service_name,
				config_type  : info?.config_type,
				unit         : info?.unit,
				id           : info?.id,
			};

			updatePlanDiscount(payload);
		} catch (err) {
			Toast.error(t('saasSubscription:discount_invalid_metadata'));
		}
	};

	return {
		loading, submitHandler, formHook,
	};
};

export default usePlanDiscount;
