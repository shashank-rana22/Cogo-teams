import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const getFormattedValues = (formValues) => {
	const quotaAttributes = {};

	Object.keys(formValues).forEach((keyName) => {
		const inputValue = Number(formValues[keyName] || '');

		quotaAttributes[keyName] = inputValue;
	});

	return quotaAttributes;
};

const getPrefillValues = (quota_attributes) => {
	const newQuotaAttributes = {};

	Object.keys(quota_attributes).forEach((keyName) => {
		newQuotaAttributes[keyName] = quota_attributes[keyName]?.toString();
	});

	return newQuotaAttributes;
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

			Toast.success(`Quota ${isUpdatable ? 'updated' : 'added'} successfully`);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'Unable to Save, Please try again!!',
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
