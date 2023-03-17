import { Toast, Modal } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import React, { useState } from 'react';

import Templates from '../../../../common/Templates';
import useSendCommunicationTemplate from '../../../../hooks/useSendCommunicationTemplate';

import styles from './styles.module.css';

function NewWhatsappMessage({
	setModalType = () => {},
}) {
	const [activeTab, setActiveTab] = useState('quick_reply');
	const [openCreateReply, setOpenCreateReply] = useState(false);
	const closeModal = () => {
		setModalType(false);
	};

	const [dialNumber, setDialNumber] = useState({
		number       : '',
		country_code : '+91',
	});
	const { sendCommunicationTemplate, loading } = useSendCommunicationTemplate(
		{
			formattedData   : {},
			isOtherChannels : true,
			callbackfunc    : closeModal,
		},
	);
	const sendWhatsappCommunication = (args) => {
		const { country_code = '', number = '' } = dialNumber;
		const numberWithCountryCode = country_code + number;
		if (number === '') {
			Toast.error('Please enter mobile number ');
		} else {
			sendCommunicationTemplate({ ...args, otherChannelRecipient: numberWithCountryCode });
		}
	};
	const data = {
		sendCommunicationTemplate : sendWhatsappCommunication,
		communicationLoading      : loading,
	};
	return (
		<Modal
			show
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
			<div className={styles.wrap_heading}>
				<div>Select a template</div>
			</div>
			<Templates
				data={data}
				activeTab={activeTab}
				openCreateReply={openCreateReply}
				setOpenCreateReply={setOpenCreateReply}
				setActiveTab={setActiveTab}
			/>
		</Modal>
	);
}

export default NewWhatsappMessage;
