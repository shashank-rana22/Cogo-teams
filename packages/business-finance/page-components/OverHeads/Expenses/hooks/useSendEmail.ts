import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendEmail = () => {
	const { profile: profileData = {} } = useSelector((state:any) => state);

	const { id: userId, name, email } = profileData?.user || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/incident-management/incident/send-overhead-mail',
			method  : 'post',
			authKey : 'post_incident_management_incident_send_overhead_mail',
		},
		{ manual: true },
	);

	const sendMail = async ({ incidentId }) => {
		try {
			const response = await trigger({
				data: {
					id          : incidentId,
					requestedBy : {
						userId,
						userName  : name,
						userEmail : email,
					},
				},
			});
			if (response?.data?.message === 'OK') {
				Toast.success('Email sent successfully');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return {
		sendMail,
		loading,
	};
};

export default useSendEmail;
