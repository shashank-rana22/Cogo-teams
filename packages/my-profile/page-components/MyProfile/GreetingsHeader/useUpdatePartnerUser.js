import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

const useUpdatePartnerUser = ({ picture, partner_user_id, setRefetch, detailsData }) => {
	const { t } = useTranslation(['profile']);

	const [showModal, setShowModal] = useState(false);

	const [editNameModal, setEditNameModal] = useState({
		from  : 'name',
		state : false,
	});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_partner_user',
		method : 'post',
	}, {
		manual: false,
	});

	const { handleSubmit, formState: { errors }, control, watch, setValue } = useForm();

	const watchProfilePicture = watch('profile_picture_url');

	const onOuterClick = () => {
		setShowModal(false);
		setEditNameModal((prev) => ({ ...prev, state: false }));
		setValue('profile_picture_url', watchProfilePicture || picture);
	};

	const onSubmit = async (values) => {
		try {
			const payload = {
				picture : values?.profile_picture_url.finalUrl,
				id      : partner_user_id,
			};

			await trigger({
				data: payload,
			});

			setRefetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			Toast.success(t('profile:image_updated_success_toast_message'));
		} catch (e) {
			Toast.error(e?.data);
		}
	};

	useEffect(() => {
		setValue('name', detailsData?.name);
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
			Toast.success(t('profile:image_updated_success_toast_message'));
		} catch (e) {
			Toast.error(e?.data);
		}
	};

	const onClickCancel = () => {
		setEditNameModal((prev) => ({ ...prev, state: false }));
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
