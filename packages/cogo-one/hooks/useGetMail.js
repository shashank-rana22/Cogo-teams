import { useLensRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetMail({ activeMail = {}, emailAddress = '' }) {
	const [{ data, loading }, trigger] = useLensRequest({
		url    : '/get_mail',
		method : 'get',
	}, { manual: true });

	const { id = '' } = activeMail || {};
	const getEmail = useCallback(async () => {
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
		getEmail();
	}, [getEmail]);

	return {
		data,
		getEmail,
		loading,
	};
}

export default useGetMail;
