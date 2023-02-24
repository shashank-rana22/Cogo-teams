import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getFormControls from './controls/get-form-controls';

const useCreateAnnouncements = ({ defaultValues = {} }) => {
	console.log('default', defaultValues);
	const { control, watch, handleSubmit, setValue } = useForm();
	const [showPreview, setShowPreview] = useState(false);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_auth_role',
		method : 'POST',
	});
	const setDefaultValues = () => {
		// setValue('title', defaultValues?.name);
	};

	useEffect(() => {
		if (Object.keys(defaultValues).length !== 0) setDefaultValues();
	}, [defaultValues]);

	const controls = getFormControls();

	const onSubmit = async (values) => {
		if (!values) return;

		const videos = values.videos.filter((item) => item.video_item).map((item) => item.video_item);
		// console.log('videos', videos);
		// delete values.videos;

		try {
			const payload = {
				...values,
				videos,
				// role_sub_functions : values?.role_sub_functions || [],
				// stakeholder_type   : 'partner',
			};

			const response = await trigger({ data: payload });
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Announcement created successfully...');
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};

	return {
		controls,
		control,
		watch,
		handleSubmit,
		onSubmit,
		showPreview,
		setShowPreview,
		loading,
		setValue,
	};
};

export default useCreateAnnouncements;
