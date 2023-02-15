import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import React from 'react';

import InactiveModal from './InactiveModal';
import MessageList from './MessageList';
import styles from './styles.module.css';
import VoiceList from './VoiceList';

function Customers({
	setActiveMessageCard = () => {},
	activeMessageCard,
	setActiveVoiceCard = () => {},
	activeVoiceCard,
	setSearchValue = () => {},
	searchValue,
	setFilterVisible = () => {},
	filterVisible,
	// fields,
	reset,
	activeTab,
	setActiveTab = () => {},
	setToggleStatus = () => {},
	toggleStatus,
	voiceList = [],
	messagesList = [],
	voiceListLoading,
	unReadChatsCount,
}) {
	return (
		<div className={styles.container}>

			<div className={styles.filters_container}>
				<div className={styles.title}>
					CogoOne
				</div>
				<Toggle
					name="a1"
					size="md"
					showOnOff
					onChange={() => setToggleStatus((p) => !p)}
					value={toggleStatus}
				/>
			</div>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="secondary"
					onChange={setActiveTab}
				>
					<TabPanel name="message" title="Message" badge={unReadChatsCount !== 0 && unReadChatsCount} />

					<TabPanel name="voice" title="Voice" />
				</Tabs>
			</div>

			{activeTab === 'message' && (
				<MessageList
					messagesList={messagesList}
					setActiveMessageCard={setActiveMessageCard}
					activeMessageCard={activeMessageCard}
					setSearchValue={setSearchValue}
					searchValue={searchValue}
					filterVisible={filterVisible}
					setFilterVisible={setFilterVisible}
					reset={reset}
				/>
			)}

			{activeTab === 'voice' && (
				<VoiceList
					setActiveVoiceCard={setActiveVoiceCard}
					activeVoiceCard={activeVoiceCard}
					voiceList={voiceList}
					voiceListLoading={voiceListLoading}
				/>
			)}

			{toggleStatus && (
				<InactiveModal
					toggleStatus={toggleStatus}
					setToggleStatus={setToggleStatus}
				/>
			)}
		</div>
	);
}

export default Customers;
