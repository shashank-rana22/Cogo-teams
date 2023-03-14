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

	// useEffect(() => {
	// 	(async () => {
	// 		if (id) {
	// 			try {
	// 				const res = await trigger({
	// 					params: { id },
	// 				});
	// 				setDisabled(true);

	// 				setDefaultValues(res?.data);
	// 			} catch (err) {
	// 				// Toast.error(err?.message);
	// 				console.log(err?.message);
	// 			}
	// 		}
	// 	})();
	// }, []);

	// useEffect(() => {
	// 	(async () => {
	// 		if (currentAnnouncement?.id) {
	// 			try {
	// 				const res = await trigger({
	// 					params: { id: currentAnnouncement?.id },
	// 				});
	// 				setAnnouncementDetails(res?.data);
	// 			} catch (err) {
	// 				Toast.error(err?.data);
	// 			}
	// 		}
	// 	})();
	// }, [currentAnnouncement]);

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
			// console.log('Error', error);
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
			// console.log('Error', error);
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
			// console.log('Error', error);
		}
	};

	return {

		deleteAttachment,
		editAttachment,
		addAttachment,
		loading,
	};
};

export default useUpdateAnnouncement;
