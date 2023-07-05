import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	tradePartyDetailId?: string | number;
}
interface Profile {
	profile?: {
		user?: {
			email?: string;
			id?: string | number;
			name?: string;
		};
	}
}

function useSendMail() {
	const profile: Profile = useSelector((state) => state);
	const user = profile?.profile?.user || {};
	const { email: userEmail, id: userId, name: userName } = user || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/send-mail-of-all-communication-to-trade-party',
			method  : 'post',
			authKey : 'post_payments_dunning_send_mail_of_all_communication_to_trade_party',
		},
		{ manual: true },
	);

	const sendMail = async ({ tradePartyDetailId }:Props) => {
		try {
			const response = await trigger({
				data: {
					tradePartyDetailId,
					userEmail,
					userId,
					userName,
				},
			});

			Toast.success(response?.data?.data);
		} catch (err) {
			console.log('err-', err);
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		sendMail,
		mailSendLoading: loading,
		data,
	};
}

export default useSendMail;
