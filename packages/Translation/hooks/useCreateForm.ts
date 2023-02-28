import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import { SingleData } from '../common/interfaces';
import { controls } from '../configs/create-update-fields';

interface Props {
	status: string;
	refetch: Function;
	setShowCreateRoleModal: Function;
	row: SingleData;
	showEdit: boolean;

}

const useCreateRequest = ({
	status, refetch, setShowCreateRoleModal, row, showEdit,
}: Props) => {
	const {
		profile: profileData = {},
	} = useSelector((state: object) => state);
	const formProps = useForm();
	const { watch } = formProps;
	const translatedValue = watch('translatedText');
	const toast = status === 'COMPLETED' ? 'Created' : 'Requested';

	const [{ loading }, trigger] = useRequestBf({
		url     : '/translation/translate',
		method  : 'POST',
		authKey : 'post_translation_translate',
	}, { manual: true });

	const [{ loading:updating }, update] = useRequestBf({
		url     : '/translation/translate',
		method  : 'PUT',
		authKey : 'put_translation_translate',
	}, { manual: true });
	const onCancel = () => {
		const { reset } = formProps;
		reset();
		setShowCreateRoleModal(false);
	};

	const onSubmit = async (values: object) => {
		const fetch = showEdit ? update : trigger;
		if (!values) return;
		try {
			const payload = {
				...values,
				id           : showEdit ? row.id : undefined,
				createdBy    : profileData.user.id,
				updatedBy    : profileData.user.id,
				translatedBy : !isEmpty(translatedValue) ? profileData.user.id : undefined,
			};

			const response = await fetch({ data: payload });
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}
			Toast.success(`${showEdit ? 'Updated' : toast} successfully...`);
			refetch();
			onCancel();
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	const modifiedControls = controls({ status, row });

	return {
		controls  : modifiedControls,
		formProps,
		onSubmit,
		createApi : { loading },
		onCancel,
		updating,
	};
};

export default useCreateRequest;
