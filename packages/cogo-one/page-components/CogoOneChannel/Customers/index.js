import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useReplyMail from '../../../hooks/useReplyMail';

import InactiveModal from './InactiveModal';
import MailList from './MailList';
import MailModal from './MailList/MailModal';
import MessageList from './MessageList';
import NewWhatsappMessage from './NewWhatsappMessage';
import styles from './styles.module.css';
import VoiceList from './VoiceList';

function Customers({
	setActiveCardId = () => {},
	setActiveMessage = () => {},
	setActiveVoiceCard = () => {},
	activeVoiceCard,
	setSearchValue = () => {},
	searchValue,
	setFilterVisible = () => {},
	filterVisible,
	activeTab,
	setActiveTab = () => {},
	toggleStatus,
	messagesList = [],
	unReadChatsCount = '',
	setAppliedFilters = () => {},
	appliedFilters = {},
	fetchworkPrefernce = () => {},
	messagesLoading = false,
	setOpenModal = () => {},
	openModal = false,
	updateUserStatus = () => {},
	statusLoading = false,
	activeCardId = '',
	isomniChannelAdmin = false,
	showBotMessages = false,
	setShowBotMessages,
	setShowDialModal = () => {},
	activeMail = {},
	setActiveMail = () => {},
	userId = '',
	handleScroll = () => {},
	setModalType = () => {},
	modalType = {},
	tagOptions = [],
	mailProps = {},
}) {
	const { emailAddress, buttonType, setButtonType } = mailProps;
	const [isChecked, setIsChecked] = useState(false);
	const [attachments, setAttachments] = useState([]);

	const {
		replyMailApi = () => {},
		replyLoading = false,
	} = useReplyMail(mailProps);

	const onChangeToggle = () => {
		if (toggleStatus) {
			setOpenModal(true);
		} else {
			updateUserStatus({ status: 'active' });
		}
	};

	const handleOpenOptions = () => {
		setIsChecked(!isChecked);
	};
	const unReadChatsCountDisplay = Number(unReadChatsCount || 0) > 49 ? '49+' : unReadChatsCount;

	const COMPONENT_MAPPING = {
		message : MessageList,
		voice   : VoiceList,
		mail    : MailList,
	};
	const Component = COMPONENT_MAPPING[activeTab] || null;

	const messageProps = {
		isomniChannelAdmin,
		messagesList,
		setActiveMessage,
		setSearchValue,
		searchValue,
		filterVisible,
		setFilterVisible,
		setAppliedFilters,
		appliedFilters,
		messagesLoading,
		activeCardId,
		setActiveCardId,
		showBotMessages,
		setShowBotMessages,
		handleScroll,
		setModalType,
		modalType,
		tagOptions,
	};

	const voiceProps = {
		setActiveVoiceCard,
		activeVoiceCard,
		activeTab,
		setShowDialModal,
	};

	const emailprops = {
		activeMail,
		setActiveMail,
		emailAddress,
	};

	const componentProps = {
		message : { ...messageProps },
		voice   : { ...voiceProps },
		mail    : { ...emailprops },
	};

	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				<div className={styles.logo}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-one-logo.svg" alt="" />
					<div className={styles.title}>
						CogoOne
					</div>
				</div>
				{!isomniChannelAdmin ? (
					<div className={styles.styled_toggle}>
						<Toggle
							name="online"
							size="md"
							showOnOff
							onChange={() => onChangeToggle()}
							checked={toggleStatus}
							loading={statusLoading}
						/>

					</div>
				) : (
					<div className={styles.bot_messages}>
						<div>Bot Messages</div>
						<Toggle
							name="online"
							size="sm"
							onChange={() => setShowBotMessages((p) => !p)}
							checked={showBotMessages}
						/>
					</div>
				)}
			</div>
			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="message" title="Chats" badge={unReadChatsCount !== 0 && unReadChatsCountDisplay} />
					<TabPanel name="voice" title="Voice" />
					<TabPanel name="mail" title="Mail" />
				</Tabs>
			</div>
			{Component && (
				<Component key={activeTab} {...(componentProps[activeTab] || {})} />
			)}

			{openModal && (
				<InactiveModal
					fetchworkPrefernce={fetchworkPrefernce}
					setOpenModal={setOpenModal}
					loading={statusLoading}
					updateUserStatus={updateUserStatus}

				/>
			)}
			<div className={styles.wrapper}>
				<input
					id="plus_checkbox"
					type="checkbox"
					className={styles.checkbox}
					checked={isChecked}
				/>
				<div htmlFor="plus_checkbox" className={styles.plus_circle}>
					<div className={styles.wheel_box}>
						<IcMPlus onClick={handleOpenOptions} fill="#ffffff" width={35} height={35} />
						<div className={styles.wheel}>
							<div className={`${styles.action} ${styles.call_icon}`}>
								<img
									onClick={() => setShowDialModal(true)}
									src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/call_light.svg"
									alt="call icon"
									role="presentation"
								/>
							</div>
							<div className={`${styles.action} ${styles.whatsapp_icon}`}>
								<img
									onClick={() => setModalType({ type: 'whatsapp_new_message_modal', data: {} })}
									src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/wapp_light.svg"
									alt="whatsapp icon"
									role="presentation"
								/>

							</div>

							<div className={`${styles.action} ${styles.mail_icon}`}>
								<img
									onClick={() => setButtonType('send_mail')}
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/email_icon_blue_2.svg"
									alt="gmail icon"
									role="presentation"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{modalType?.type && (
				<NewWhatsappMessage
					setModalType={setModalType}
					modalType={modalType}
				/>
			)}

			{buttonType && (
				<MailModal
					mailProps={mailProps}
					userId={userId}
					attachments={attachments}
					setAttachments={setAttachments}
					activeMail={activeMail}
					replyMailApi={replyMailApi}
					replyLoading={replyLoading}
				/>
			)}
		</div>
	);
}

export default Customers;
