import useAxios from 'axios-hooks';
import { useEffect, useCallback } from 'react';

/**
 * Single utility hook to get mail from Cogo RPA using id of email
 */

const useGetMail = (email_address, message_id, mail_id) => {
	const [getMailApi, triggerGetMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/get_mail`,
			method : 'GET',
		},
		{ manual: true },
	);
	const [getMailRpaApi, triggerGetRpaMail] = useAxios(
		{
			url    : `${process.env.COGO_LENS_URL}/get_rpa_mail`,
			method : 'GET',
		},
		{ manual: true },
	);

	const getRpaMail = useCallback(() => {
		(async () => {
			try {
				await triggerGetRpaMail({
					params: {
						mail_id,
					},
				});
			} catch (err) {
				console.log(err);
			}
		}
		)();
	}, [triggerGetRpaMail, mail_id]);

	const getEmail = useCallback(() => {
		(async () => {
			try {
				const res = await triggerGetMail({
					params: {
						email_address,
						message_id,
					},
				});
				if (res?.data?.error?.code === 'ErrorItemNotFound') {
					getRpaMail();
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [email_address, message_id, triggerGetMail, getRpaMail]);

	useEffect(() => {
		if (message_id) {
			getEmail();
		}
	}, [message_id, getEmail]);

	const isFromRpa = getMailApi?.data?.error?.code === 'ErrorItemNotFound';

	const rpaData = getMailRpaApi?.data;

	const rpaMailData = {
		...(rpaData || {}),
		body: {
			content: rpaData?.body,
		},
		ccRecipients: (rpaData?.cc_mails || []).map((item) => ({
			emailAddress: { address: item },
		})),
		toRecipients: (rpaData?.to_mails || []).map((item) => ({
			emailAddress: { address: item },
		})),
		from             : { emailAddress: { address: rpaData?.sender } },
		receivedDateTime : rpaData?.received_time,
		isFromRpa,
	};

	const emailData = isFromRpa ? rpaMailData : getMailApi?.data;
	const loading = isFromRpa ? getMailRpaApi?.loading : getMailApi?.loading;

	return {
		getMailApi,
		getEmail,
		getMailRpaApi,
		emailData,
		loading,
	};
};

export default useGetMail;
