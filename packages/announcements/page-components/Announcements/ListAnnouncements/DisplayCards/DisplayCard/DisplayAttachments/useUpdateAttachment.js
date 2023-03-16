/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateAnnouncement = ({
	announcement_id = '',
	refetch = () => {},

}) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_announcement_attachment',
	}, { manual: true });

	const [{ loadingAdd }, triggerAdd] = useRequest({
		method : 'post',
		url    : '/create_announcement_attachment',
	}, { manual: true });

	const addAttachment = async (id, url, type, index) => {
		try {
			const response = await triggerAdd(
				{
					data: {
						announcement_id : id,
						document_type   : type,
						document_name   : type,
						document_url    : url,
					},
				},
			);
			if (response?.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Attachment added successfully...');
			refetch(announcement_id, index);
		} catch (err) {
			Toast.error(err?.message);
		}
	};
	const deleteAttachment = async (id, index) => {
		try {
			const response = await trigger(
				{
					data: {
						id,
						status: 'inactive',
					},
				},
			);
			if (response?.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Attachment deleted successfully...');
			refetch(announcement_id, index);
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	const editAttachment = async (data, url, index) => {
		try {
			const response = await trigger(
				{
					data: {
						id            : data?.id,
						document_name : data?.document_name,
						document_type : data?.document_type,
						document_url  : url,
					},
				},
			);
			if (response?.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}

			Toast.success('Attachment updated successfully...');
			refetch(announcement_id, index);
		} catch (err) {
			Toast.error(err?.message);
		}
	};
	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		// eslint-disable-next-line no-undef
		window.open(modifiedUrl, '_blank');
	};
	return {
		loadingAdd,
		deleteAttachment,
		editAttachment,
		addAttachment,
		loading,
		openDocument,
	};
};

export default useUpdateAnnouncement;
