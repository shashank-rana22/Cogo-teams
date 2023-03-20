import { usePublicRequest } from '@cogoport/request';
// import { useEffect, useState } from 'react';

function useSendMail({ setShowMailModal = () => {} }) {
	const [{ loading }, trigger] = usePublicRequest({
		url    : 'https://lens.dev.cogoport.io/send_mail',
		method : 'POST',

	}, { manual: true });

	const createMail = async (payload) => {
		console.log('payload:', payload);
		try {
			await trigger({
				data: payload,
			});
		} catch (error) {
			// console.log(error)
		} finally {
			setShowMailModal(false);
		}
	};

	return {
		createMail,
		createMailLoading: loading,
	};
}
export default useSendMail;
