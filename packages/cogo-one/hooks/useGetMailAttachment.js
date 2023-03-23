import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetMailAttachment({ activeMail = {}, emailAddress = '' }) {
	const [{ data, loading }, trigger] = usePublicRequest({
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/get_attachments`,
		method : 'get',
	}, { manual: true });

	const { id = '' } = activeMail || {};

	const emailAttachment = async () => {
		try {
			await trigger({
				params: {
					email_address : emailAddress,
					// email_address : 'dineshkumar.s@cogoport.com',
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
