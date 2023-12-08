// import { Tabs, TabPanel } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUnread } from '@cogoport/icons-react';
// import { Image } from '@cogoport/next';
import React, { useState } from 'react';

// import getTabMappings from '../../../configurations/getTabMappings';
// import { getUserActiveMails } from '../../../configurations/mail-configuration';
// import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import useGetUnreadCallsCount from '../../../hooks/useGetUnreadCallsCount';
// import useGetUnreadMailsCount from '../../../hooks/useGetUnreadMailsCount';
// import useGetUnreadMessagesCount from '../../../hooks/useGetUnreadMessagesCount';
// import useGetUnreadTeamsCount from '../../../hooks/useGetUnreadTeamsCount';

// import AgentSettings from './AgentSettings';
// import CommunicationModals from './CommunicationModals';
// import MailsList from './MailList';
// import MessageList from './MessageList';
import styles from './styles.module.css';
import Teams from './Teams';
// import VoiceList from './VoiceList';

const COMPONENT_MAPPING = {
	// message         : MessageList,
	// voice           : VoiceList,
	// outlook         : MailsList,
	// firebase_emails : MailsList,
	teams: Teams,
};

const DEFAULT_PADDING_NOT_REQUIRED = ['outlook', 'firebase_emails', 'teams'];

function Customers({
	setActiveTab = () => {},
	activeTab = {},
	userId = '',
	// setModalType = () => {},
	// modalType = {},
	// tagOptions = [],
	// mailProps = {},
	firestore = {},
	viewType = '',
	// workPrefernceLoading = false,
	// setOpenKamContacts = () => {},
	// agentStatus = {},
	// fetchworkPrefernce = () => {},
	// agentTimeline = () => {},
	// setSendBulkTemplates = () => {},
	// setSelectedAutoAssign = () => {},
	// selectedAutoAssign = {},
	// autoAssignChats = {},
	// setAutoAssignChats = () => {},
	// preferenceLoading = false,
	// setIsBotSession = () => {},
	// isBotSession = false,
	isMobile = false,
}) {
	const [openSearch, setOpenSearch] =	useState(false);
	console.log(firestore, 'firestore');
	// const {
	// userEmailAddress = '',
	// userSharedMails = [],
	// } = mailProps || {};

	// const userActiveMails = getUserActiveMails({ viewType, userEmailAddress });

	// const { unReadChatsCount } = useGetUnreadMessagesCount({
	// 	firestore,
	// 	viewType,
	// 	agentId: userId,
	// 	isBotSession,
	// });

	// const { unReadMailsCount = 0, throttledGetCount = () => {} } = useGetUnreadMailsCount({
	// 	firestore,
	// 	viewType,
	// 	agentId: userId,
	// 	isBotSession,
	// 	userSharedMails,
	// });

	// const { unreadTeamsCount = 0 } = useGetUnreadTeamsCount({ firestore });

	const { fetchUnreadCall = () => {} } = useGetUnreadCallsCount({ activeTab });

	// const unReadMissedCallCount = data?.total_missed_call_count;

	const componentPropsMapping = {
		// message: {
		// 	userId,
		// 	firestore,
		// 	viewType,
		// 	isBotSession,
		// 	setIsBotSession,
		// 	tagOptions,
		// 	setModalType,
		// 	selectedAutoAssign,
		// 	setSelectedAutoAssign,
		// 	autoAssignChats,
		// 	setAutoAssignChats,
		// 	workPrefernceLoading,
		// 	setSendBulkTemplates,
		// 	mailsToBeShown: userSharedMails,
		// },
		// voice: {
		// 	setActiveVoiceCard: (val) => {
		// 		setActiveTab((prev) => ({ ...prev, data: val }));
		// 	},
		// 	activeVoiceCard : activeTab?.data || {},
		// 	activeTab       : activeTab?.tab,
		// 	viewType,
		// },
		// outlook: {
		// 	mailProps,
		// 	viewType,
		// 	mailsToBeShown: userActiveMails,
		// },
		// firebase_emails: {
		// 	mailProps,
		// 	viewType,
		// 	mailsToBeShown: userSharedMails,
		// 	firestore,
		// 	userId,
		// 	isBotSession,
		// 	throttledGetCount,
		// },
		teams: {
			setActiveTeamCard: (val) => {
				setActiveTab((prev) => ({
					...prev,
					data: val,
				}));
			},
			activeTeamCard  : activeTab?.data || {},
			activeTab       : activeTab?.tab,
			viewType,
			firestore,
			loggedInAgentId : userId,
			setActiveTab,
		},
	};

	// const tabMappings = getTabMappings({
	// 	// viewType,
	// 	unreadTeamsCount,
	// });

	const Component = COMPONENT_MAPPING[activeTab?.tab] || null;

	// const handleChangeTab = (val) => {
	// 	setActiveTab((prev) => ({ ...prev, tab: val, data: {}, subTab: 'all' }));
	// };

	// useEffect(() => {
	// 	const chatTabsActive = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.chat_tabs_to_be_shown || [];

	// 	if (!chatTabsActive?.includes(activeTab?.tab) && viewType) {
	// 		setActiveTab((prev) => ({
	// 			...prev,
	// 			tab: chatTabsActive?.[GLOBAL_CONSTANTS.zeroth_index] || 'message',
	// 		}));
	// 	}
	// }, [activeTab?.tab, setActiveTab, viewType]);

	return (
		<div
			className={styles.container}
			style={DEFAULT_PADDING_NOT_REQUIRED.includes(activeTab?.tab)
				? { padding: 0 } : {}}
		>
			{/* <div
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
					preferenceLoading={preferenceLoading}
					isMobile={isMobile}
				/>
			</div> */}

			<div
				className={styles.tabs}
				// style={DEFAULT_PADDING_NOT_REQUIRED.includes(activeTab?.tab)
				// 	? { padding: '0 10px' } : {}}
			>
				{/* <Tabs
					activeTab={activeTab?.tab}
					fullWidth
					// themeType="secondary"
					// onChange={handleChangeTab}
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
				</Tabs> */}
				<div className={styles.teams_chat}>Chat</div>
				<div
					style={{ cursor: 'pointer' }}
					aria-hidden
					onClick={() => setOpenSearch(!openSearch)}
				>
					<IcMUnread />

				</div>
			</div>

			{Component && (
				<Component
					key={activeTab?.tab}
					{...(componentPropsMapping[activeTab?.tab] || {})}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					fetchUnreadCall={fetchUnreadCall}
					isMobile={isMobile}
					openSearch={openSearch}
				/>
			)}

			{/* <CommunicationModals
				mailProps={mailProps}
				setModalType={setModalType}
				modalType={modalType}
				userId={userId}
				viewType={viewType}
				setOpenKamContacts={setOpenKamContacts}
				setSendBulkTemplates={setSendBulkTemplates}
				firestore={firestore}
				activeSelect={activeTab?.tab || ''}
				isMobile={isMobile}
			/> */}
		</div>
	);
}

export default Customers;
