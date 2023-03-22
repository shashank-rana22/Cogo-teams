import { Toast } from '@cogoport/components';
import { usePublicRequest } from '@cogoport/request';
// import { useEffect, useState } from 'react';

function useSendMail({
	setShowMailModal = () => {},
	setEmailState = () => {},
	setRecipientArray = () => {},
	setBccArray = () => {},
}) {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://lens.dev.cogoport.io/send_mail',
		method : 'POST',
	}, { manual: true });

	const createMail = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Mail Sent Successfully.');
		} catch (error) {
			// console.log(error)
		} finally {
			setEmailState({});
			setRecipientArray([]);
			setBccArray([]);
			setShowMailModal(false);
		}
	};

	return {
		createMail,
		createMailLoading: loading,
	};
}
export default useSendMail;
