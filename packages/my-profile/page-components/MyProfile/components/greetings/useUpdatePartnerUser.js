import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useUpdatePartnerUser = ({ picture, partner_user_id, setRefetch, detailsData }) => {
	const [showModal, setShowModal] = useState(false);

	const [editNameModal, setEditNameModal] = useState(false);

	const { handleSubmit, formState: { errors }, control, watch, setValue } = useForm();

	const watchProfilePicture = watch('profile_picture_url');

	const [{ loading }, trigger] = useRequest({
		url    : '/update_partner_user',
		method : 'post',
	}, {
		manual: false,
	});

	const onOuterClick = () => {
		setShowModal(false);
		setEditNameModal(false);
		setValue('profile_picture_url', watchProfilePicture?.finalUrl || picture);
	};

	const onSubmit = async (values) => {
		try {
			const payload = {
				picture : values?.profile_picture_url?.finalUrl,
				id      : partner_user_id,
			};

			await trigger({
				data: payload,
			});

			setRefetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			Toast.success('Image updated successfully!');
		} catch (e) {
			Toast.error(e?.data);
		}
	};

	useEffect(() => {
		setValue('name', detailsData?.name);
		setValue('email', detailsData?.email);
		setValue('preferred_languages', detailsData?.preferred_languages);
		setValue(
			'mobileNumber',
			{
				number       : detailsData?.mobile_number,
				country_code : detailsData?.mobile_country_code,
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailsData]);

	const onDeleteButton = async () => {
		try {
			const payload = {
				picture : null,
				id      : partner_user_id,
			};

			await trigger({
				data: payload,
			});

			setRefetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			Toast.success('Image updated successfully!');
		} catch (e) {
			Toast.error(e?.data);
		}
	};

	const onClickCancel = () => {
		setShowModal(false);
	};

	return {
		onOuterClick,
		setShowModal,
		onSubmit,
		setEditNameModal,
		editNameModal,
		control,
		errors,
		handleSubmit,
		showModal,
		onDeleteButton,
		watchProfilePicture,
		loading,
		onClickCancel,
	};
};

export default useUpdatePartnerUser;
