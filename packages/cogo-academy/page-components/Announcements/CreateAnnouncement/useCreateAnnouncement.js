import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { format, addDays } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getFormControls from './controls/get-form-controls';

const useCreateAnnouncements = ({
	defaultValues = {},
	announcement_id = '',
	actionType,
	listAudienceLoading = false,
}) => {
	const router = useRouter();
	const prev_audiences = defaultValues?.faq_audiences?.map((item) => item.id);

	const { control, watch, handleSubmit, formState:{ errors }, setValue } = useForm();

	const formValues = watch();

	const [showPreview, setShowPreview] = useState(false);
	const [{ loading }, trigger] = useRequest({
		url    : '/create_announcement',
		method : 'POST',
	}, { manual: true });

	const controls = getFormControls();
	const getDateValue = (date) => format(date, 'dd MMM yyyy hh:mm a').split(' ')[0];

	useEffect(() => {
		if (actionType !== 'edit') return;

		const {
			validity_start = '',
			validity_end = '',
			faq_audiences = [],
			hot_duration,
			is_important = false,
		} = defaultValues;
		const validity = {
			endDate   : new Date(format(validity_end, 'dd MMM yyyy hh:mm a')),
			startDate : new Date(format(validity_start, 'dd MMM yyyy hh:mm a')),
		};
		const audience_ids = [...faq_audiences.map((item) => item.id)];
		setValue('title', defaultValues?.title);
		setValue('content', defaultValues?.content);
		setValue('announcement_type', defaultValues?.announcement_type);
		setValue('redirection_url', defaultValues?.redirection_url);
		setValue('is_important', is_important);
		setValue('audience_ids', audience_ids);
		setValue('hot_duration', getDateValue(hot_duration) - getDateValue(validity_start));
		setValue('validity', validity);
	}, [defaultValues, listAudienceLoading, actionType, setValue]);

	const [{ error }, updateTrigger] = useRequest({ url: '/update_announcement', method: 'post' }, { manual: true });

	const editAnnouncementDetails = async (values) => {
		if (!values) return;
		const {
			title,
			announcement_type,
			content,
			validity,
			redirection_url,
			is_important,
			audience_ids,
		} = values;
		const common = audience_ids.filter((x) => prev_audiences.indexOf(x) !== -1);
		const inactive_audience_ids = prev_audiences.filter((n) => !common.includes(n));
		const new_audiences = audience_ids.filter((n) => !common.includes(n));
		const { startDate:validity_start, endDate:validity_end } = validity;
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
				audience_ids: new_audiences,
				inactive_audience_ids,
			};
			const response = await updateTrigger(
				{ data: { id: announcement_id, ...payload } },
			);
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Announcement updated successfully...');
			router.back();
		} catch (err) {
			Toast.error(err?.message);
			console.log('Error', error);
		}
	};

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
			router.back();
		} catch (err) {
			Toast.error(err?.message || 'Something went wrong');
		}
	};

	return {
		controls,
		control,
		watch,
		formValues,
		handleSubmit,
		onSubmit,
		errors,
		showPreview,
		editAnnouncementDetails,
		setShowPreview,
		loading,
		setValue,
	};
};

export default useCreateAnnouncements;
