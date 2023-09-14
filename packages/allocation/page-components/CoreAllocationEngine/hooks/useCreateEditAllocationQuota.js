import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const getFormattedValues = (formValues) => {
	const QUOTA_ATTRIBUTES = {};

	Object.keys(formValues).forEach((keyName) => {
		const inputValue = Number(formValues[keyName] || '');

		QUOTA_ATTRIBUTES[keyName] = inputValue;
	});

	return QUOTA_ATTRIBUTES;
};

const getPrefillValues = (quota_attributes) => {
	const NEW_QUOTA_ATTRIBUTES = {};

	Object.keys(quota_attributes).forEach((keyName) => {
		NEW_QUOTA_ATTRIBUTES[keyName] = quota_attributes[keyName]?.toString();
	});

	return NEW_QUOTA_ATTRIBUTES;
};

const useCreateEditAllocationQuota = (props) => {
	const {
		onCloseModal,
		refetch,
		radioValue,
		roleTypeId,
		isUpdatable,
		quotaItem,
		setRoleTypeId,
		t = () => {},
	} = props;

	const { quota_attributes: quotaAttributes = {}, id } = quotaItem;

	const prefillValues = getPrefillValues(quotaAttributes);

	const formProps = useForm({
		defaultValues: prefillValues,
	});

	const apiName = isUpdatable ? 'quota_attributes' : 'quota';

	const authkey = isUpdatable ? 'post_allocation_quota_attributes' : 'post_allocation_quota';

	const [{ loading }, trigger] = useAllocationRequest({
		url    : `/${apiName}`,
		method : 'post',
		authkey,
	}, { manual: true });

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const propsForCreation = {
			quota_type: radioValue,
			...(radioValue === 'role' && {
				role_id: roleTypeId,
			}),
			...(radioValue === 'user' && {
				user_id: roleTypeId,
			}),
			quota_attributes: getFormattedValues(formValues),
		};

		try {
			const payload = {
				...(isUpdatable ? { id, ...(getFormattedValues(formValues) || {}) } : propsForCreation),
			};

			await trigger({ data: payload });

			onCloseModal();

			refetch();

			Toast.success(`${t('allocation:quota_label')} ${isUpdatable ? t('allocation:updated_label')
				: t('allocation:added_label')} ${t('allocation:successfully_label')}`);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| t('allocation:save_error_default'),
			);
		}
	};

	useEffect(() => {
		setRoleTypeId('');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [radioValue]);

	return {
		formProps,
		onSave,
		loading,
	};
};

export default useCreateEditAllocationQuota;
