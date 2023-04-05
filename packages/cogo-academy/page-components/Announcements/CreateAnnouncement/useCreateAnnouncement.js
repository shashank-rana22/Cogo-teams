import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { differenceInDays, format, addDays } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getFormControls from './controls/get-form-controls';

let RichTextEditor;
if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

const useCreateAnnouncements = ({
	defaultValues = {},
	announcement_id = '',
	actionType,
	listAudienceLoading = false,
	setShowSubmitModal = () => {},
	refetchList = () => {},
}) => {
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());

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

	useEffect(() => {
		if (actionType !== 'edit') return;

		const {
			validity_start = '',
			validity_end = '',
			faq_audiences = [],
			hot_duration,
			content,
			is_important = false,
		} = defaultValues;
		const validity = {
			endDate   : new Date(format(validity_end, 'dd MMM yyyy hh:mm a')),
			startDate : new Date(format(validity_start, 'dd MMM yyyy hh:mm a')),
		};
		const audience_ids = [...faq_audiences.map((item) => item.id)];
		setValue('title', defaultValues?.title);
		setEditorValue(RichTextEditor?.createValueFromString((content || ''), 'html'));
		setValue('announcement_type', defaultValues?.announcement_type);
		setValue('redirection_url', defaultValues?.redirection_url);
		setValue('is_important', is_important);
		setValue('audience_ids', audience_ids);
		setValue('hot_duration', differenceInDays(new Date(hot_duration), new Date(validity_start)));
		setValue('validity', validity);
	}, [defaultValues, listAudienceLoading, actionType, setValue]);

	const [{ loading:loadingEditAndGoLive }, updateTrigger] = useRequest({
		url    : '/update_announcement',
		method : 'post',
	}, { manual: true });

	const editAnnouncementDetails = async (values) => {
		if (!values) return;
		const {
			title,
			announcement_type,
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
				content      : editorValue.toString('html'),
				validity_start,
				validity_end,
				hot_duration,
				redirection_url,
				is_important,
				audience_ids : new_audiences,
				inactive_audience_ids,
			};
			const response = await updateTrigger(
				{ data: { id: announcement_id, ...payload } },
			);
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			setShowSubmitModal(false);

			Toast.success('Announcement updated successfully...');
			router.back();
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	const onSubmit = async (values) => {
		const videos = values.videos?.filter((item) => item.video_item).map((item) => item.video_item);

		const {
			title,
			announcement_type,
			validity,
			redirection_url,
			is_important,
			audience_ids,
			images,
			files,
		} = values;

		const { startDate:validity_start, endDate:validity_end } = validity;

		const attachments = [...videos.map((video) => (
			{
				document_type : 'video',
				document_name : 'video',
				document_url  : video,
			}
		)), ...images.map((image) => (
			{
				document_type : 'image',
				document_name : 'image',
				document_url  : (image.finalUrl ? image.finalUrl : image),
			}
		)), ...files.map((file) => (
			{
				document_type : 'pdf',
				document_name : 'files',
				document_url  : (file.finalUrl ? file.finalUrl : file),
			}
		))];
		const hot_duration = addDays(validity_start, values?.hot_duration);

		try {
			const payload = {
				status  : 'draft',
				title,
				announcement_type,
				content : editorValue.toString('html'),
				validity_start,
				validity_end,
				hot_duration,
				redirection_url,
				is_important,
				audience_ids,
				attachments,
			};

			const response = await trigger({ data: payload });

			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			setShowSubmitModal(false);

			Toast.success('Announcement created successfully...');

			router.back();
		} catch (err) {
			Toast.error(err?.message || 'Something went wrong');
		}
	};

	const goLive = async (id) => {
		try {
			const response = await updateTrigger(
				{
					data: {
						id,
						status: 'active',
					},
				},
			);
			if (response?.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('This Announcement is Live Now !');
			refetchList();
		} catch (err) {
			Toast.error(err?.message);
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
		loadingEditAndGoLive,
		goLive,
		setValue,
		editorValue,
		setEditorValue,
		RichTextEditor,
	};
};

export default useCreateAnnouncements;
