/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useUpdateAnnouncement = ({
	announcement_id = '',
	listData = [],
	currentAttachment = null,
	refetch = () => {},
	setCurrentAttachment = () => {},
}) => {
	const [attachmentDetailsToggle, setAttachmentDetailsToggle] = useState(false);
	const [attachmentDetails, setAttachmentDetails] = useState({});
	// const [defaultValues, setDefaultValues] = useState({});
	const [disabled, setDisabled] = useState(false);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_announcement_attachment',
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

	const deleteAttachment = async (id, index) => {
		try {
			const response = await trigger(
				{
					data: {
						id,
						document_name : '',
						document_type : '',
						document_url  : '',
						status        : 'inactive',
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

	// const handleAttachmentDetails = (key) => {
	// 	setAttachmentDetailsToggle(attachmentDetailsToggle === key ? false : key);
	// 	if (currentAttachment && attachmentDetailsToggle === key) {
	// 		setCurrentAttachment(null);
	// 	} else {
	// 		setAttachmentDetails(null);
	// 		setCurrentAttachment(listData?.[key]);
	// 	}
	// };

	return {
		// handleAttachmentDetails,
		// announcementDetailsToggle,
		// defaultValues,
		// refetch                   : getAnnouncement,
		deleteAttachment,
		loadingSingleAnnouncement : loading,
		attachmentDetails         : attachmentDetails || {},
		disabled,
	};
};

export default useUpdateAnnouncement;
