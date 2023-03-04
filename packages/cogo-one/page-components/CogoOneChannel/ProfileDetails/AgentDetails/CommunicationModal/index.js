import { Modal } from '@cogoport/components';
import { useState } from 'react';

import Templates from '../../../../../common/Templates';
import useSendCommunicationTemplate from '../../../../../hooks/useSendCommunicationTemplate';

import ComposeEmail from './ComposeEmail';
import styles from './styles.module.css';

function CommunicationModal({
	setModalType = () => {},
	userData = {},
	modalType = '',
	activeCardData = {},
	isomniChannelAdmin = false,
}) {
	const COMPONENT_MAPPING = {
		email    : ComposeEmail,
		whatsapp : Templates,
	};
	const { userId, name, leadUserId } = activeCardData;
	const formattedData = {
		user_name    : name,
		user_id      : userId,
		lead_user_id : leadUserId,
	};
	const closeModal = () => {
		setModalType(null);
	};

	const { sendCommunicationTemplate, loading } = useSendCommunicationTemplate(
		{
			formattedData,
			isOtherChannels : true,
			callbackfunc    : closeModal,
		},
	);

	const sendQuickCommuncation = ({
		otherChannelRecipient = '',
		type = '',
		template_name = '',
		variables = {},
	}) => {
		sendCommunicationTemplate({
			template_name,
			otherChannelRecipient,
			variables,
			type,
		});
	};

	const [openCreateReply, setOpenCreateReply] = useState(false);
	const ActiveModalComp = COMPONENT_MAPPING[modalType] || null;

	const whatsappTemplatesData = {
		sendCommunicationTemplate : sendQuickCommuncation,
		communicationLoading      : loading,
	};
	return (
		<Modal
			show
			size={modalType === 'whatsapp' ? 'xs' : 'md'}
			onClose={closeModal}
			onClickOutside={closeModal}
			scroll={false}
		>
			<Modal.Header
				title={(
					<div className={styles.header}>
						{modalType === 'whatsapp'
							? 'Send Whatsapp Template'
							: 'Compose Email'}
					</div>
				)}
			/>
			{ActiveModalComp && (
				<ActiveModalComp
					closeModal={closeModal}
					openCreateReply={openCreateReply}
					setOpenCreateReply={setOpenCreateReply}
					userData={userData}
					sendQuickCommuncation={sendQuickCommuncation}
					isomniChannelAdmin={isomniChannelAdmin}
					data={whatsappTemplatesData}
				/>
			)}
		</Modal>
	);
}

export default CommunicationModal;
