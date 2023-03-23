import { usePublicRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useListMailDetails({ activeMail = {}, emailAddress = '' }) {
	const [{ data, loading }, trigger] = usePublicRequest({
		url    : `${process.env.NEXT_PUBLIC_COGO_LENS_URL}/get_mail`,
		method : 'get',
	}, { manual: true });

	const { id = '' } = activeMail || {};
	const getEmail = async () => {
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
		getEmail();
	}, [activeMail]);

	return {
		data,
		getEmail,
		loading,
	};
}

export default useListMailDetails;
