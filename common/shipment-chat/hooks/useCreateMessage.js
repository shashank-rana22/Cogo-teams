import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogoport/store';
import { toast } from '@cogoport/front/components';

const shipmentChatStakeholders = [
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'booking_agent',
	'supply_agent',
	'docs_team',
];

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
}) => {
	const [errors, setErrors] = useState({});
	const scope = useSelector(({ general }) => general?.scope);
	const createMessageAPI = useRequest(
		'post',
		false,
		scope,
	)('/create_chat_message');

	const sh = stakeHolderView.split(' ');

	const sh_arr = (sh || []).map((item) => {
		return item.replace('@', '');
	});

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

	const url = (formValues?.file || []).map((obj) => {
		return obj.url;
	});

	const onError = (err) => {
		setErrors(err);
	};

	const PersonalChannel = {
		visible_to_user_ids: personal_data?.subscribed_user_ids,
	};

	let visible_to_stakeholders = isStakeholder
		? [...filtered_arr, shipment_data?.stakeholder_types?.[0]]
		: [...filtered_arr];

	visible_to_stakeholders = visible_to_stakeholders?.filter((item) =>
		shipmentChatStakeholders.includes(item),
	);
	const GroupChannel = filtered_arr.length
		? {
			created_by_stakeholder: shipment_data?.stakeholder_types?.[0],
			source_id: sourceId,
			visible_to_stakeholders,
		}
		: {
			created_by_stakeholder: shipment_data?.stakeholder_types?.[0],
			source_id: sourceId,
			visible_to_user_ids: subscribedUsers,
		};

	const payload = source === 'shipment' ? GroupChannel : PersonalChannel;

	const handleSendMsg = async () => {
		try {
			const res = await createMessageAPI.trigger({
				data: {
					content: formValues?.message || '',
					attachment_urls: url || [],
					channel_id: id,
					...payload,
				},
			});

			if (!res.hasError) {
				reset();
				sendToRef?.current?.setText('');
			}
		} catch (err) {
			toast.error(
				err?.error?.base?.[0] ||
				'Unable to send message, Please try again later!',
			);
		}
	};

	const onCreate = () => {
		if (payload?.visible_to_stakeholders?.length < 2) {
			toast.error('Please tag appropriate stakeholder');
		} else {
			handleSendMsg();
		}
	};

	return {
		errors,
		onError,
		onCreate,
		loading: createMessageAPI.loading,
	};
};

export default useCreateMessage;
