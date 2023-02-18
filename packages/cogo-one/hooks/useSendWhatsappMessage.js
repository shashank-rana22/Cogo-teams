import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendWhatsappMessage = () => {
	const {
		user_data:{ user:{ id } },
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/create_communication',
		method : 'post',
	}, { manual: true });

	const createWhatsappCommunication = async ({ recipient, message_metadata, user_id, organization_id }) => {
		await trigger({
			data: {
				type       : 'whatsapp',
				recipient,
				message_metadata,
				user_id,
				organization_id,
				service    : 'user',
				service_id : id,
				source     : 'CogoVerse',

			},
		});
	};
	return {
		createWhatsappCommunication,
		loading,
	};
};
export default useSendWhatsappMessage;
