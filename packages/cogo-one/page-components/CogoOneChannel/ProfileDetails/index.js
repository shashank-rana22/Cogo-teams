import { useState, useEffect } from 'react';

import COMPONENT_MAPPING from '../../../constants/COMPONENT_MAPPING';
import useCheckChannelPartner from '../../../hooks/useCheckChannelPartner';
import useCheckCustomerCheckoutQuotationConflict from '../../../hooks/useCheckCustomerCheckoutQuotationConflict';
import useListOmnichannelDocuments from '../../../hooks/useListOmnichannelDocuments';
import getActiveCardDetails from '../../../utils/getActiveCardDetails';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

const DEFAULT_OPEN_NAV_MAPPING = {
	shipment_view : 'user_activity',
	supply_view   : 'flash_shipment_bookings',
	default       : 'profile',
};

function ProfileDetails({
	activeMessageCard,
	activeTab,
	activeVoiceCard,
	updateLeaduser,
	activeCardId,
	setModalType = () => {},
	setActiveMessage = () => {},
	activeRoomLoading,
	setRaiseTicketModal = () => {},
	zippedTicketsData = {},
	viewType = '',
	hasVoiceCallAccess,
	firestore,
	userId = '',
}) {
	const customerId = (activeTab === 'message' ? activeMessageCard : activeVoiceCard)?.id;

	const [activeSelect, setActiveSelect] = useState(
		DEFAULT_OPEN_NAV_MAPPING[viewType] || DEFAULT_OPEN_NAV_MAPPING.default,
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
						updateLeaduser={updateLeaduser}
						orgId={orgId}
						disableQuickActions={disableQuickActions}
						documents_count={documents_count}
						setModalType={setModalType}
						hideCpButton={hideCpButton}
						getOrgDetails={getOrgDetails}
						setActiveMessage={setActiveMessage}
						activeRoomLoading={activeRoomLoading}
						setActiveSelect={setActiveSelect}
						showMore={showMore}
						setShowMore={setShowMore}
						setRaiseTicketModal={setRaiseTicketModal}
						zippedTicketsData={zippedTicketsData}
						quotationSentData={quotationEmailSentAt}
						viewType={viewType}
						hasVoiceCallAccess={hasVoiceCallAccess}
						firestore={firestore}
						userId={userId}
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
