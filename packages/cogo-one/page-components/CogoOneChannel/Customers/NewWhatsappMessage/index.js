import { Modal } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import React, { useState } from 'react';

import Templates from '../../../../common/Templates';
import useSendCommunicationTemplate from '../../../../hooks/useSendCommunicationTemplate';

import styles from './styles.module.css';

function NewWhatsappMessage({
	setModalType = () => {},
	// modalType = '',
	// data = {},
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
		const numberWithCountryCode = dialNumber.country_code + dialNumber.number;
		sendCommunicationTemplate({ ...args, otherChannelRecipient: numberWithCountryCode });
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
			scroll={false}
		>
			<Modal.Header
				title={(
					<div className={styles.header}>
						Send New Whatsapp Chat
					</div>
				)}
			/>
			<div className={styles.wrap_mobile_number}>

				<SelectMobileNumber
					value={dialNumber}
					onChange={(val) => setDialNumber(val)}
					inputType="number"
					placeholder="Enter number"
				/>
			</div>
			<div className={styles.wrap_mobile_number}>
				<h3>Select a template</h3>
			</div>
			<Templates
				data={data}
				activeTab={activeTab}
				openCreateReply={openCreateReply}
				setOpenCreateReply={setOpenCreateReply}
				setActiveTab={setActiveTab}
			/>
			{/* <Button
				size="md"
				themeType="accent"
				disabled={!dialNumber.number || dialNumber.number.length !== 10}
			>
				Send Message

			</Button> */}

		</Modal>
	);
}

export default NewWhatsappMessage;
