import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useSendCommunicationTemplate from '../../hooks/useSendCommunicationTemplate';
import useSendUserWhatsappTemplate from '../../hooks/useSendUserWhatsappTemplate';
import ComposeEmail from '../ComposeEmail';
import Templates from '../Templates';

import styles from './styles.module.css';

const TAKE_COUNTRY_CODE_TILL = 1;

function CommunicationModal({
	closeModal = () => {},
	userData = {},
	modalType = '',
	activeCardData = {},
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
	const {
		whatsapp_country_code = '', whatsapp_number = '',
	} = userData || {};

	const {
		sendUserWhatsappTemplate,
		loading: whatsappLoading,
	} =	 useSendUserWhatsappTemplate({ callbackfunc: closeModal });

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
		...restArgs
	}) => {
		sendCommunicationTemplate({
			template_name,
			otherChannelRecipient,
			variables,
			type,
			...restArgs,
		});
	};

	const [openCreateReply, setOpenCreateReply] = useState(false);
	const ActiveModalComp = COMPONENT_MAPPING[modalType] || null;

	const whatsappTemplatesData = {
		sendCommunicationTemplate: (args) => sendUserWhatsappTemplate(
			{
				...args,
				country_code: whatsapp_country_code?.slice(TAKE_COUNTRY_CODE_TILL) || '91',
				whatsapp_number,
			},
		),
		communicationLoading: loading,
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
					data={whatsappTemplatesData}
					loading={loading || whatsappLoading}
				/>
			)}
		</Modal>
	);
}

export default CommunicationModal;
