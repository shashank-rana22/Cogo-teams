import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import React from 'react';

import InactiveModal from './InactiveModal';
import MessageList from './MessageList';
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
}) {
	const onChangeToggle = () => {
		if (toggleStatus) {
			setOpenModal(true);
		} else {
			updateUserStatus({ status: 'active' });
		}
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
						<div>Only Bot Messages</div>
						<Toggle
							name="bot messages"
							size="sm"
							showOnOff
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
				/>
			)}

			{activeTab === 'voice' && (
				<VoiceList
					setActiveVoiceCard={setActiveVoiceCard}
					activeVoiceCard={activeVoiceCard}
					activeTab={activeTab}
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
		</div>
	);
}

export default Customers;
