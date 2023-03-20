import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListMailDetails({ activeMail = {} }) {
	const [{ data }, trigger] = usePublicRequest({
		url    : `${process.env.MAIL_BASE_URL}/get_mail`,
		method : 'get',
	}, { manual: true });

	const { id = '' } = activeMail || {};
	const getEmail = async () => {
		try {
			await trigger({
				params: {
					email_address : 'dineshkumar.s@cogoport.com',
					message_id    : id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getEmail();
	}, [activeMail]);

	return {
		data,
		getEmail,
	};
}

export default useListMailDetails;
