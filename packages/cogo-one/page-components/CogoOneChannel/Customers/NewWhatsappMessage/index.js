import { Toast, Modal } from '@cogoport/components';
import React, { useState	} from 'react';

import Templates from '../../../../common/Templates';
import useSendUserWhatsappTemplate from '../../../../hooks/useSendUserWhatsappTemplate';

import styles from './styles.module.css';

const COUNTRY_CODE_INDEX = 1;

const PREFILL_CALL_DATA = ['voice_call_component', 'new_user_outbound'];

function NewWhatsappMessage({
	setModalType = () => {},
	modalType = {},
	viewType = '',
}) {
	const [openCreateReply, setOpenCreateReply] = useState(false);

	const { type = '', data:modalData = {}, userName = '' } = modalType || {};

	const [dialNumber, setDialNumber] = useState(PREFILL_CALL_DATA.includes(type) ? modalData : {
		number       : '',
		country_code : '+91',
	});

	const closeModal = () => {
		setModalType({ type: null, data: {} });
		setDialNumber({
			number       : '',
			country_code : '+91',
		});
	};

	const { sendUserWhatsappTemplate, loading } = useSendUserWhatsappTemplate(
		{
			callbackfunc: closeModal,
			viewType,
		},
	);

	const sendWhatsappCommunication = (args = {}) => {
		const { country_code = '', number = '' } = dialNumber;
		if (!number) {
			Toast.error('Please enter mobile number');
			return;
		}

		const { template_name, variables } = args;
		sendUserWhatsappTemplate({
			country_code    : country_code.slice(COUNTRY_CODE_INDEX),
			whatsapp_number : number,
			template_name,
			variables,
		});
	};

	const data = {
		sendCommunicationTemplate : sendWhatsappCommunication,
		communicationLoading      : loading,
	};
	return (
		<Modal
			show={type}
			size="xs"
			onClose={closeModal}
			onClickOutside={closeModal}
			scroll
			className={styles.styled_modal_class}
		>
			<Modal.Header
				title={(
					<div className={styles.header}>
						Send New Whatsapp Message
					</div>
				)}
			/>
			<Templates
				data={data}
				openCreateReply={openCreateReply}
				setOpenCreateReply={setOpenCreateReply}
				type={type}
				setDialNumber={setDialNumber}
				dialNumber={dialNumber}
				key={type}
				userName={userName}
			/>
		</Modal>
	);
}

export default NewWhatsappMessage;
