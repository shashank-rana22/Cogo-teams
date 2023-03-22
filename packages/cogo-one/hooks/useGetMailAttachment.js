import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetMailAttachment({ activeMail }) {
	const [{ data, loading }, trigger] = usePublicRequest({
		url    : 'https://lens.dev.cogoport.io/get_attachments',
		method : 'get',
	}, { manual: true });

	const { id = '' } = activeMail || {};

	const emailAttachment = async () => {
		try {
			await trigger({
				params: {
					email_address : 'dineshkumar.s@cogoport.com',
					message_id    : id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		emailAttachment();
	}, [activeMail]);

	return {
		attachmentData    : data,
		attachmentLoading : loading,
	};
}

export default useGetMailAttachment;
