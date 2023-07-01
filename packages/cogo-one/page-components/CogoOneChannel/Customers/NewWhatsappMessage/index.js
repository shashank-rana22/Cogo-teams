import { Toast, Modal } from '@cogoport/components';
import React, { useState, useEffect	} from 'react';

import Templates from '../../../../common/Templates';
import useSendUserWhatsappTemplate from '../../../../hooks/useSendUserWhatsappTemplate';

import styles from './styles.module.css';

function NewWhatsappMessage({
	setModalType = () => {},
	modalType = {},
}) {
	const [openCreateReply, setOpenCreateReply] = useState(false);

	const [dialNumber, setDialNumber] = useState({
		number       : '',
		country_code : '+91',
	});
	const { type = '', data:modalData = {} } = modalType || {};

	const closeModal = () => {
		setModalType(false);
		setDialNumber({
			number       : '',
			country_code : '+91',
		});
	};

	useEffect(() => {
		if (type === 'voice_call_component') {
			setDialNumber(modalData);
		}
	}, [modalData, type]);

	const { sendUserWhatsappTemplate, loading } = useSendUserWhatsappTemplate(
		{
			callbackfunc: closeModal,
		},
	);
	const sendWhatsappCommunication = (args = {}) => {
		const { country_code = '', number = '' } = dialNumber;
		if (!number) {
			Toast.error('Please enter mobile number');
			return;
		}

		const { template_name } = args;
		sendUserWhatsappTemplate({ country_code: country_code.slice(1), whatsapp_number: number, template_name });
	};
	const data = {
		sendCommunicationTemplate : sendWhatsappCommunication,
		communicationLoading      : loading,
	};
	return (
		<Modal
			show={modalType?.type}
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
			/>
		</Modal>
	);
}

export default NewWhatsappMessage;
