import { Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import getTabMappings from '../../../configurations/getTabMappings';
import { getUserActiveMails } from '../../../configurations/mail-configuration';
import useGetUnreadCallsCount from '../../../hooks/useGetUnreadCallsCount';
import useGetUnreadMessagesCount from '../../../hooks/useGetUnreadMessagesCount';

import AgentSettings from './AgentSettings';
import CommunicationModals from './CommunicationModals';
import MailsList from './MailList';
import MessageList from './MessageList';
import styles from './styles.module.css';
import VoiceList from './VoiceList';

const COMPONENT_MAPPING = {
	message         : MessageList,
	voice           : VoiceList,
	outlook         : MailsList,
	firebase_emails : MailsList,
};

const DEFAULT_PADDING_NOT_REQUIRED = ['outlook', 'firebase_emails'];

function Customers({
	setActiveTab = () => {},
	activeTab = {},
	userId = '',
	setModalType = () => {},
	modalType = {},
	tagOptions = [],
	mailProps = {},
	firestore = {},
	viewType = '',
	workPrefernceLoading = false,
	setOpenKamContacts = () => {},
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	setSendBulkTemplates = () => {},
	setSelectedAutoAssign = () => {},
	selectedAutoAssign = {},
	autoAssignChats = {},
	setAutoAssignChats = () => {},
}) {
	const {
		userEmailAddress = '',
		userSharedMails = [],
	} = mailProps || {};

	const [isBotSession, setIsBotSession] = useState(false);
	const userActiveMails = getUserActiveMails({ viewType, userEmailAddress });

	const { unReadChatsCount } = useGetUnreadMessagesCount({
		firestore,
		viewType,
		agentId: userId,
		isBotSession,
	});

	const { data = {}, fetchUnreadCall = () => {} } = useGetUnreadCallsCount({ activeTab });

	const unReadMissedCallCount = data?.total_missed_call_count;

	const componentPropsMapping = {
		message: {
			userId,
			firestore,
			viewType,
			isBotSession,
			setIsBotSession,
			tagOptions,
			setModalType,
			selectedAutoAssign,
			setSelectedAutoAssign,
			autoAssignChats,
			setAutoAssignChats,
			workPrefernceLoading,
			setSendBulkTemplates,
		},
		voice: {
			setActiveVoiceCard: (val) => {
				setActiveTab((prev) => ({ ...prev, data: val }));
			},
			activeVoiceCard : activeTab?.data || {},
			activeTab       : activeTab?.tab,
		},
		outlook: {
			mailProps,
			viewType,
			mailsToBeShown: userActiveMails,
		},
		firebase_emails: {
			mailProps,
			viewType,
			mailsToBeShown: userSharedMails,
			firestore,
			userId,
		},
	};

	const tabMappings = getTabMappings({ unReadChatsCount, unReadMissedCallCount, viewType });

	const Component = COMPONENT_MAPPING[activeTab?.tab] || null;

	const handleChangeTab = (val) => {
		setActiveTab((prev) => ({ ...prev, tab: val, data: {}, subTab: 'all' }));
	};

	return (
		<div
			className={styles.container}
			style={DEFAULT_PADDING_NOT_REQUIRED.includes(activeTab?.tab)
				? { padding: 0 } : {}}
		>
			<div
				className={styles.filters_container}
				style={DEFAULT_PADDING_NOT_REQUIRED.includes(activeTab?.tab)
					? { padding: '10px 10px 0 10px' } : {}}
			>
				<div className={styles.logo}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogo_one_logo}
						alt="cogo_one_logo"
						width={25}
						height={25}
					/>
					<div className={styles.title}>
						CogoOne
					</div>
				</div>

				<AgentSettings
					viewType={viewType}
					agentStatus={agentStatus}
					fetchworkPrefernce={fetchworkPrefernce}
					agentTimeline={agentTimeline}
					setIsBotSession={setIsBotSession}
					isBotSession={isBotSession}
					userId={userId}
					firestore={firestore}
				/>
			</div>

			<div
				className={styles.tabs}
				style={DEFAULT_PADDING_NOT_REQUIRED.includes(activeTab?.tab)
					? { padding: '0 10px' } : {}}
			>
				<Tabs
					activeTab={activeTab?.tab}
					fullWidth
					themeType="secondary"
					onChange={handleChangeTab}
				>
					{tabMappings.map((eachTab) => {
						if (!eachTab.show) {
							return null;
						}

						return (
							<TabPanel
								key={eachTab?.value}
								name={eachTab?.value}
								title={eachTab?.label}
								badge={eachTab?.badge || null}
							/>
						);
					})}
				</Tabs>
			</div>

			{Component && (
				<Component
					key={activeTab?.tab}
					{...(componentPropsMapping[activeTab?.tab] || {})}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					fetchUnreadCall={fetchUnreadCall}
				/>
			)}

			<CommunicationModals
				mailProps={mailProps}
				setModalType={setModalType}
				modalType={modalType}
				userId={userId}
				viewType={viewType}
				setOpenKamContacts={setOpenKamContacts}
				setSendBulkTemplates={setSendBulkTemplates}
			/>
		</div>
	);
}

export default Customers;
