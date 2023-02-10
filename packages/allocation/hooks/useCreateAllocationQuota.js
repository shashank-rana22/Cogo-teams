import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const getFormattedValues = (formValues) => {
	const quotaAttributes = {};

	Object.keys(formValues).forEach((keyName) => {
		// ! ask to remove redundant things from backend
		// const inputValue = formValues[keyName];

		// if (inputValue) {
		// 	quotaAttributes[keyName] = Number(inputValue);
		// }

		quotaAttributes[keyName] = Number(formValues[keyName] || '');
	});

	return quotaAttributes;
};

const useCreateAllocationQuota = (props) => {
	const {
		onCloseModal,
		refetch,
		radioValue,
		roleTypeId,
	} = props;

	const formProps = useForm();

	const api = useRequest({
		url    : '/create_allocation_quota',
		method : 'post',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const onSave = async (formValues, e) => {
		e.preventDefault();

		console.log('roleTypeId', roleTypeId);

		if (isEmpty(roleTypeId)) {
			Toast.info('Please add role-type in order to save');

			return;
		}

		const payload = {
			quota_attributes : getFormattedValues(formValues),
			quota_type       : radioValue,
			...(radioValue === 'role' && {
				role_id: roleTypeId,
			}),
			...(radioValue === 'user' && {
				user_id: roleTypeId,
			}),
		};

		try {
			await trigger({ data: payload });

			onCloseModal();
			refetch();
			Toast.success('Quota added successfully');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'Unable to Save, Please try again!!',
			);
		}
	};

	return {
		formProps,
		onSave,
		loading,
	};
};

export default useCreateAllocationQuota;
