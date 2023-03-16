import { Toast, Modal } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import React, { useState } from 'react';

import Templates from '../../../../common/Templates';
import useSendUserWhatsappTemplate from '../../../../hooks/useSendUserWhatsappTemplate';

import styles from './styles.module.css';

function NewWhatsappMessage({
	setModalType = () => {},
	modalType = false,
}) {
	const [activeTab, setActiveTab] = useState('quick_reply');
	const [openCreateReply, setOpenCreateReply] = useState(false);

	const [dialNumber, setDialNumber] = useState({
		number       : '',
		country_code : '+91',
	});
	const closeModal = () => {
		setModalType(false);
		setDialNumber({
			number       : '',
			country_code : '+91',
		});
	};
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
			show={modalType}
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
			<div className={styles.wrap_heading}>
				<div>Enter mobile number</div>
			</div>
			<div className={styles.wrap_mobile_number}>

				<SelectMobileNumber
					value={dialNumber}
					onChange={(val) => setDialNumber(val)}
					inputType="number"
					placeholder="Enter number"
				/>
			</div>

			<Templates
				data={data}
				activeTab={activeTab}
				openCreateReply={openCreateReply}
				setOpenCreateReply={setOpenCreateReply}
				setActiveTab={setActiveTab}
				type="defaultOpen"
			/>
		</Modal>
	);
}

export default NewWhatsappMessage;
