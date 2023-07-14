import { useState, useEffect } from 'react';

import COMPONENT_MAPPING from '../../../constants/COMPONENT_MAPPING';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import useCheckChannelPartner from '../../../hooks/useCheckChannelPartner';
import useCheckCustomerCheckoutQuotationConflict from '../../../hooks/useCheckCustomerCheckoutQuotationConflict';
import useListOmnichannelDocuments from '../../../hooks/useListOmnichannelDocuments';
import getActiveCardDetails from '../../../utils/getActiveCardDetails';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails({
	activeMessageCard,
	activeTab,
	activeVoiceCard,
	activeCardId,
	setModalType = () => {},
	activeRoomLoading,
	setRaiseTicketModal = () => {},
	zippedTicketsData = {},
	viewType = '',
	firestore,
	userId = '',
	setActiveTab,
}) {
	const customerId = (activeTab === 'message' ? activeMessageCard : activeVoiceCard)?.id;

	const [activeSelect, setActiveSelect] = useState(
		VIEW_TYPE_GLOBAL_MAPPING[viewType]?.default_side_nav || 'profile',
	);
	const [showMore, setShowMore] = useState(false);
	const ActiveComp = COMPONENT_MAPPING[activeSelect] || null;
	const formattedMessageData = getActiveCardDetails(activeMessageCard) || {};
	const orgId = activeTab === 'message'
		? formattedMessageData?.organization_id
		: activeVoiceCard?.organization_id;

	const {
		openNewTab,
		loading,
		ORG_PAGE_URL = '',
		disableQuickActions, hideCpButton, getOrgDetails,
	} = useCheckChannelPartner({ orgId, activeCardId, activeTab });

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

	useEffect(() => {
		setShowMore(false);
	}, [activeSelect]);

	return (
		<div className={styles.profile_div}>
			<div className={styles.container}>
				{ActiveComp && (
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
						setModalType={setModalType}
						hideCpButton={hideCpButton}
						getOrgDetails={getOrgDetails}
						activeRoomLoading={activeRoomLoading}
						setActiveSelect={setActiveSelect}
						showMore={showMore}
						setShowMore={setShowMore}
						setRaiseTicketModal={setRaiseTicketModal}
						zippedTicketsData={zippedTicketsData}
						quotationSentData={quotationEmailSentAt}
						viewType={viewType}
						firestore={firestore}
						userId={userId}
						setActiveTab={setActiveTab}
					/>
				)}
			</div>

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
			/>
		</div>
	);
}

export default ProfileDetails;
