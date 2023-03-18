import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateMessage = ({
	shipment_data = {},
	formValues,
	reset = () => { },
	id,
	sourceId,
	source,
	stakeHolderView,
	sendToRef,
	personal_data,
	subscribedUsers = [],
	isStakeholder = true,
	shipmentChatStakeholders = [],
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_chat_message',
		method : 'POST',
	}, { manual: true });

	const sh = stakeHolderView.split(' ');
	const sh_arr = (sh || []).map((item) => item.replace('@', ''));
	const condition_arr = sh_arr.length && sh_arr[0] !== '' ? [...sh_arr] : [];
	const filtered_arr = (condition_arr || []).map((item) => {
		if (item === '') {
			return null;
		}
		if (item === 'Kam') {
			return 'booking_agent';
		}
		return item?.toLowerCase();
	});

	const url = (formValues?.file || []).map((obj) => obj.url);

	const PersonalChannel = {
		visible_to_user_ids: personal_data?.subscribed_user_ids,
	};

	let visible_to_stakeholders = isStakeholder
		? [...filtered_arr, shipment_data?.stakeholder_types?.[0]]
		: [...filtered_arr];

	visible_to_stakeholders = visible_to_stakeholders?.filter((item) => shipmentChatStakeholders.includes(item));
	const GroupChannel = filtered_arr.length
		? {
			created_by_stakeholder: shipment_data?.stakeholder_types?.[0], source_id: sourceId, visible_to_stakeholders,
		}
		: {
			created_by_stakeholder : shipment_data?.stakeholder_types?.[0],
			source_id              : sourceId,
			visible_to_user_ids    : subscribedUsers,
		};

	const payload = source === 'shipment' ? GroupChannel : PersonalChannel;

	const handleSendMsg = async () => {
		try {
			const res = await trigger({
				data: {
					content: formValues?.message || '', attachment_urls: url || [], channel_id: id, ...payload,
				},
			});

			if (!res.hasError) {
				reset();
				sendToRef?.current?.setText('');
			}
		} catch (err) {
			Toast.error(
				err?.error?.base?.[0]
				|| 'Unable to send message, Please try again later!',
			);
		}
	};

	const onCreate = () => {
		if (payload?.visible_to_stakeholders?.length < 2) {
			Toast.error('Please tag appropriate stakeholder');
		} else {
			handleSendMsg();
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useCreateMessage;
