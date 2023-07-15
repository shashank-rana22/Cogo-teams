import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import { controls } from '../../Controller/Config/create-level-config';

const useCreateRequest = ({
	refetch = () => {},
	setShowCreateRoleModal = () => {},
}) => {
	const {
		profile: profileData = {},
	} = useSelector((state) => state);
	const formProps = useForm();
	const { watch } = formProps;
	const translatedValue = watch('translatedText');

	const [{ loading }, trigger] = useRequestBf({
		url     : '/translation/translate',
		method  : 'POST',
		authKey : 'post_translation_translate',
	}, { manual: true });

	const onCancel = () => {
		const { reset } = formProps;
		reset();
		setShowCreateRoleModal(false);
	};

	const onSubmit = async (values) => {
		if (!values) return;
		try {
			const payload = {
				...values,
				createdBy    : profileData.user.id,
				updatedBy    : profileData.user.id,
				translatedBy : !isEmpty(translatedValue) ? profileData.user.id : undefined,
			};

			const response = await trigger({ data: payload });
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}
			Toast.success('Created successfully...');
			refetch();
			onCancel();
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		controls,
		formProps,
		onSubmit,
		createApi: { loading },
		onCancel,
	};
};

export default useCreateRequest;
