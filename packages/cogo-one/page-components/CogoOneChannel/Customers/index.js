import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import InactiveModal from './InactiveModal';
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
	unReadChatsCount,
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

}) {
	const [modalType, setModalType] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
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
					<TabPanel name="message" title="Chats" badge={unReadChatsCount !== 0 && unReadChatsCount} />
					<TabPanel name="voice" title="Voice" />
				</Tabs>
			</div>

			{activeTab === 'message' && (
				<MessageList
					isomniChannelAdmin={isomniChannelAdmin}
					messagesList={messagesList}
					setActiveMessage={setActiveMessage}
					setSearchValue={setSearchValue}
					searchValue={searchValue}
					filterVisible={filterVisible}
					setFilterVisible={setFilterVisible}
					setAppliedFilters={setAppliedFilters}
					appliedFilters={appliedFilters}
					messagesLoading={messagesLoading}
					activeCardId={activeCardId}
					setActiveCardId={setActiveCardId}
					showBotMessages={showBotMessages}
					setShowBotMessages={setShowBotMessages}
				/>
			)}

			{activeTab === 'voice' && (
				<VoiceList
					setActiveVoiceCard={setActiveVoiceCard}
					activeVoiceCard={activeVoiceCard}
					activeTab={activeTab}
					setShowDialModal={setShowDialModal}
				/>
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
									onClick={() => setModalType(true)}
									src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/wapp_light.svg"
									alt="whatsapp icon"
									role="presentation"
								/>

							</div>
						</div>
					</div>
				</div>
			</div>
			<NewWhatsappMessage
				setModalType={setModalType}
				modalType={modalType}
			/>
		</div>
	);
}

export default Customers;
