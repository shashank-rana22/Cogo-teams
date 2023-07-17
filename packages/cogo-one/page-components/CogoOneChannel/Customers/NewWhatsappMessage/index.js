import { Toast, Modal } from '@cogoport/components';
import React, { useState, useEffect	} from 'react';

import Templates from '../../../../common/Templates';
import useSendUsersBulkCommunication from '../../../../hooks/useSendUsersBulkCommunication';
import useSendUserWhatsappTemplate from '../../../../hooks/useSendUserWhatsappTemplate';

import styles from './styles.module.css';

const COUNTRY_CODE_INDEX = 1;

function NewWhatsappMessage({
	setModalType = () => {},
	modalType = {},
	viewType = '',
	selectedAutoAssign = {},
	setSelectedAutoAssign = () => {},
	setAutoAssignChats = () => {},
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
			viewType,
		},
	);

	const { bulkCommunicationChat } = useSendUsersBulkCommunication({
		callbackfunc: closeModal,
		setSelectedAutoAssign,
		setAutoAssignChats,
	});

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
		sendCommunicationTemplate: type === 'bulk_communication' ? (args) => {
			const { template_name, variables } = args;
			bulkCommunicationChat({ selectedAutoAssign, variables, template_name });
		} : sendWhatsappCommunication,
		communicationLoading: loading,
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
				key={type}
				selectedAutoAssign={selectedAutoAssign}
			/>
		</Modal>
	);
}

export default NewWhatsappMessage;
