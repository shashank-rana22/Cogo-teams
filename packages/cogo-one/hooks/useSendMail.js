import { usePublicRequest } from '@cogoport/request';
// import { useEffect, useState } from 'react';

function useSendMail() {
	const [{ loading }, trigger] = usePublicRequest({
		url    : `${process.env.MAIL_BASE_URL}/send_mail`,
		method : 'POST',

	}, { manual: true });

	const createMail = async () => {
		try {
			await trigger({
				data: {
					sender       : '',
					toUserEmail  : '',
					ccrecipients : '',
					subject      : '',
					content      : '',
					attachments  : '',
					msgId        : '',
					userId       : '',
				},
			});
		} catch (error) {
			// console.log(error)
		}
	};

	return {
		createMail,
		createMailLoading: loading,
	};
}
export default useSendMail;
