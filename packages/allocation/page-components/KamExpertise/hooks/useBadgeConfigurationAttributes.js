import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { snakeCase } from '@cogoport/utils';
import { useState } from 'react';

const useUpdateSingleBadge = (props) => {
	const { medal = '', id, image_url:previous_image_url, score:previous_score, listRefetch } = props;
	const [openModal, setOpenModal] = useState(false);

	const formProps = useForm();

	const onClose = () => {
		setOpenModal((pv) => !pv);
	};

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration_detail_attributes',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_badge_configuration_detail_attributes',
	}, { manual: true });

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			Bronze_value = '',
			Bronze_img_value = '',
			Silver_value = '',
			Silver_img_value = '',
			Gold_value = '',
			Gold_img_value = '',
		} = formValues || {};

		let score = '';
		let image_url = '';

		if (medal === 'Bronze') {
			score = Bronze_value;
			image_url = Bronze_img_value;
		} else if (medal === 'Silver') {
			score = Silver_value;
			image_url = Silver_img_value;
		} else {
			score = Gold_value;
			image_url = Gold_img_value;
		}

		try {
			const payload = {
				status    : 'active',
				id,
				medal     : snakeCase(medal),
				image_url : image_url?.finalUrl || previous_image_url,
				score     : score || previous_score,
			};

			await trigger({ data: payload });

			onClose();

			listRefetch();

			Toast.success('Badge Updated!');
		} catch (error) {
			Toast.error(error?.response?.data?.error || 'Something went wrong');
		}
	};
	return {
		loading,
		onSave,
		onClose,
		formProps,
		openModal,
	};
};

export default useUpdateSingleBadge;
