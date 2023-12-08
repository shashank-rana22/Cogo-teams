import { cl } from '@cogoport/components';
import { useState } from 'react';

import { FIREBASE_TABS, ENABLE_EXPAND_SIDE_BAR, ENABLE_SIDE_BAR } from '../../../constants';
import COMPONENT_MAPPING from '../../../constants/COMPONENT_MAPPING';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import useCheckChannelPartner from '../../../hooks/useCheckChannelPartner';
import useCheckCustomerCheckoutQuotationConflict from '../../../hooks/useCheckCustomerCheckoutQuotationConflict';
import useListOmnichannelDocuments from '../../../hooks/useListOmnichannelDocuments';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails({
	activeMessageCard = {},
	activeTab = '',
	activeVoiceCard = {},
	activeCardId = '',
	// setModalType = () => {},
	activeRoomLoading = false,
	setRaiseTicketModal = () => {},
	zippedTicketsData = {},
	viewType = '',
	firestore = {},
	userId = '',
	setActiveTab = () => {},
	formattedMessageData = {},
	orgId = '',
	mailProps = {},
	chatsConfig = {},
	membersList = [],
	teamsSideBarCheck = false,
	groupMembersLoading = false,
	userName = '',
	isMobile = false,
}) {
	const customerId = (FIREBASE_TABS.includes(activeTab) ? activeMessageCard : activeVoiceCard)?.id;

	const [activeSelect, setActiveSelect] = useState(
		activeTab === 'teams' ? 'teams_profile'
			: activeMessageCard?.defaultSideNav || VIEW_TYPE_GLOBAL_MAPPING[viewType]?.default_side_nav || 'profile',
	);

	const ActiveComp = COMPONENT_MAPPING[activeSelect] || null;
	console.log(ActiveComp, 'teamsProfile');
	const {
		organizationData = {},
		openNewTab,
		loading,
		ORG_PAGE_URL = '',
		disableQuickActions, hideCpButton, getOrgDetails,
	} = useCheckChannelPartner({ orgId, activeCardId, activeTab, formattedMessageData });

	const {
		documents_count = 0,
	} = useListOmnichannelDocuments({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		customerId,
		activeSelect,
		type: 'count',
	});

	const { quotationSentData = {} } = useCheckCustomerCheckoutQuotationConflict(
		{ orgId },
	);
	const quotationEmailSentAt = quotationSentData?.quotation_email_sent_at;
	const expandedSideBar = (ENABLE_SIDE_BAR.includes(chatsConfig?.data?.channel_type)
		|| ((ENABLE_EXPAND_SIDE_BAR.includes(
			chatsConfig?.data?.channel_type,
		) || teamsSideBarCheck) && chatsConfig?.expandSideBar));

	return (
		<div className={styles.profile_div}>
			{expandedSideBar ? (
				<div className={cl`${styles.container}
			${activeSelect === 'add_on_services' ? styles.add_on_services_tab : ''}`}
				>
					{ActiveComp && (
						// <div>Hellp</div>
						<ActiveComp
							customerId={customerId}
							activeMessageCard={activeMessageCard}
							activeSelect={activeSelect}
							activeTab={activeTab}
							activeVoiceCard={activeVoiceCard}
							formattedMessageData={formattedMessageData}
							loading={loading}
							openNewTab={openNewTab}
							ORG_PAGE_URL={ORG_PAGE_URL}
							orgId={orgId}
							disableQuickActions={disableQuickActions}
							documents_count={documents_count}
							// setModalType={setModalType}
							hideCpButton={hideCpButton}
							getOrgDetails={getOrgDetails}
							activeRoomLoading={activeRoomLoading}
							setActiveSelect={setActiveSelect}
							setRaiseTicketModal={setRaiseTicketModal}
							zippedTicketsData={zippedTicketsData}
							quotationSentData={quotationEmailSentAt}
							viewType={viewType}
							firestore={firestore}
							userId={userId}
							setActiveTab={setActiveTab}
							mailProps={mailProps}
							organizationData={organizationData}
							membersList={membersList}
							chatsConfig={chatsConfig}
							groupMembersLoading={groupMembersLoading}
							userName={userName}
							isMobile={isMobile}
						/>
					)}
				</div>
			) : null}

			<RightSideNav
				activeSelect={activeSelect}
				setActiveSelect={setActiveSelect}
				openNewTab={openNewTab}
				loading={loading}
				disableQuickActions={disableQuickActions}
				documentsCount={documents_count}
				activeMessageCard={activeMessageCard}
				activeVoiceCard={activeVoiceCard}
				activeTab={activeTab}
				quotationEmailSentAt={quotationEmailSentAt}
				orgId={orgId}
				viewType={viewType}
				formattedMessageData={formattedMessageData}
				setActiveTab={setActiveTab}
				expandSideBar={chatsConfig?.expandSideBar}
				isMobile={isMobile}
			/>
		</div>
	);
}

export default ProfileDetails;
