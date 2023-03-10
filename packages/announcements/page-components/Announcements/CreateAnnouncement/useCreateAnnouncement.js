import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { format, addDays } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getFormControls from './controls/get-form-controls';

const useCreateAnnouncements = ({ defaultValues = {} }) => {
	console.log('check', defaultValues);
	const { control, watch, handleSubmit, formState:{ errors }, setValue } = useForm();
	const [showPreview, setShowPreview] = useState(false);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_announcement',
		method : 'POST',
	}, { manual: true });

	const controls = getFormControls();

	useEffect(() => {
		const { validity_end = '', validity_start = '', hot_duration, faq_audiences = [] } = defaultValues;
		console.log('check', validity_start);
		const validity = {
			startDate : format(validity_start, 'd/MM/yyyy hh:mm a'),
			endDate   : format(validity_end, 'd/MM/yyyy hh:mm a'),
		};
		setValue('title', defaultValues?.title);
		setValue('content', defaultValues?.content);
		setValue('announcement_type', defaultValues?.announcement_type);
		setValue('redirection_url', defaultValues?.redirection_url);
		// setValue('is_important', 'true');
		setValue('audience_ids', [...faq_audiences.map((item) => item.id)]);
		// setValue('validity', validity);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValues]);

	const onSubmit = async (values) => {
		if (!values) return;

		const videos = values.videos?.filter((item) => item.video_item).map((item) => item.video_item);

		const {
			title,
			announcement_type,
			content,
			validity,
			redirection_url,
			is_important,
			audience_ids,
		} = values;
		const { startDate:validity_start, endDate:validity_end } = validity;
		const { images, files } = values;
		const downloadables = [...videos.map((video) => (
			{
				document_type : 'video',
				document_name : 'video',
				document_url  : video,
			}
		)), ...images.map((image) => (
			{
				document_type : 'image',
				document_name : 'image',
				document_url  : image,
			}
		)), ...files.map((file) => (
			{
				document_type : 'pdf',
				document_name : 'files',
				document_url  : file,
			}
		))];
		const hot_duration = addDays(validity_start, values?.hot_duration);

		try {
			const payload = {
				title,
				announcement_type,
				content,
				validity_start,
				validity_end,
				hot_duration,
				redirection_url,
				is_important,
				audience_ids,
				downloadables,
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
		errors,
		showPreview,
		setShowPreview,
		loading,
		setValue,
	};
};

export default useCreateAnnouncements;
