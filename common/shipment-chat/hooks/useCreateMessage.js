import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateMessage = ({
	channelData = {},
	formValues,
	reset = () => { },
	id,
	sourceId,
	source,
	stakeHolderView,
	sendToRef,
	personalData,
	subscribedUsers = [],
	isStakeholder = true,
	shipmentChatStakeholders = [],
	setSelectedFile = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_chat_message',
		method : 'POST',
	}, { manual: true });

	const sh = stakeHolderView.split(' ');
	const shArr = (sh || []).map((item) => item.replace('@', ''));
	const conditionArr = shArr.length && shArr[0] !== '' ? [...shArr] : [];
	const filteredArr = (conditionArr || []).map((item) => {
		if (item === '') {
			return null;
		}
		if (item === 'Kam') {
			return 'booking_agent';
		}
		return item?.toLowerCase();
	});

	const PersonalChannel = {
		visible_to_user_ids: personalData?.subscribed_user_ids,
	};

	let visible_to_stakeholders = isStakeholder
		? [...filteredArr, channelData?.stakeholder_types?.[0]]
		: [...filteredArr];

	visible_to_stakeholders = visible_to_stakeholders?.filter((item) => shipmentChatStakeholders.includes(item));
	const GroupChannel = filteredArr.length
		? {
			created_by_stakeholder: channelData?.stakeholder_types?.[0], source_id: sourceId, visible_to_stakeholders,
		}
		: {
			created_by_stakeholder : channelData?.stakeholder_types?.[0],
			source_id              : sourceId,
			visible_to_user_ids    : subscribedUsers,
		};

	const payload = source === 'shipment' ? GroupChannel : PersonalChannel;

	const handleSendMsg = async () => {
		try {
			const res = await trigger({
				data: {
					content         : formValues?.message || '',
					attachment_urls : formValues?.file || [],
					channel_id      : id,
					...payload,
				},
			});

			if (!res.hasError) {
				reset();
				sendToRef?.current?.setText('');
				setSelectedFile([]);
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
