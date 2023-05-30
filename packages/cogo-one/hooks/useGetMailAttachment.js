import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetMailAttachment({ activeMail = {}, emailAddress = '' }) {
	const [{ data, loading }, trigger] = useLensRequest({
		url    : '/get_attachments',
		method : 'get',
	}, { manual: true });

	const { id = '' } = activeMail || {};

	const emailAttachment = useCallback(async () => {
		try {
			await trigger({
				params: {
					email_address : emailAddress,
					message_id    : id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [emailAddress, id, trigger]);

	useEffect(() => {
		emailAttachment();
	}, [emailAttachment]);

	return {
		attachmentData    : data,
		attachmentLoading : loading,
	};
}

export default useGetMailAttachment;
