import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
// import { useEffect } from 'react';

import controls from './controls';

const useEditPersonalDetails = ({
	refetch = () => {},
	setShowModal = () => {},
	// detailsData,
	partner_user_id,
}) => {
	// const updateUserApi = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/update_partner_user');

	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_partner_user',
		method : 'post',
	}, { manual: false });

	const { fields, handleSubmit } = useForm(controls);

	// useEffect(() => {
	// 	if (detailsData) {
	// 		setValue('name', detailsData.name);
	// 	}
	// }, [detailsData, setValue]);

	const onCreate = async (values = {}) => {
		try {
			const payload = {
				id   : partner_user_id,
				name : values?.name,
			};

			await trigger({
				data: payload,
			});

			refetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			Toast.success('Personal Details updated successfully!');
		} catch (e) {
			Toast.error('Mobile number is invalid');
		}
	};

	return {
		fields,
		handleSubmit,
		onCreate,
		loading,
	};
};

export default useEditPersonalDetails;
