import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import React from 'react';

import InactiveModal from './InactiveModal';
import MessageList from './MessageList';
import styles from './styles.module.css';
import VoiceList from './VoiceList';

function Customers({
	setActiveMessage = () => {},
	activeMessageCard,
	setActiveVoiceCard = () => {},
	activeVoiceCard,
	setSearchValue = () => {},
	searchValue,
	setFilterVisible = () => {},
	filterVisible,
	activeTab,
	setActiveTab = () => {},
	setToggleStatus = () => {},
	toggleStatus,
	messagesList = [],
	unReadChatsCount,
	setAppliedFilters = () => {},
	appliedFilters = {},
	status = '',
	workPrefernce = () => {},
	MessageLoading,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				<div className={styles.logo}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogo-one-logo.svg" alt="" />
					<div className={styles.title}>
						CogoOne
					</div>
				</div>
				<Toggle
					name="online"
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
					setActiveMessage={setActiveMessage}
					activeMessageCard={activeMessageCard}
					setSearchValue={setSearchValue}
					searchValue={searchValue}
					filterVisible={filterVisible}
					setFilterVisible={setFilterVisible}
					setAppliedFilters={setAppliedFilters}
					appliedFilters={appliedFilters}
					MessageLoading={MessageLoading}
				/>
			)}

			{activeTab === 'voice' && (
				<VoiceList
					setActiveVoiceCard={setActiveVoiceCard}
					activeVoiceCard={activeVoiceCard}
					activeTab={activeTab}
				/>
			)}

			{toggleStatus && (
				<InactiveModal
					toggleStatus={toggleStatus}
					setToggleStatus={setToggleStatus}
					workPrefernce={workPrefernce}
				/>
			)}
		</div>
	);
}

export default Customers;
