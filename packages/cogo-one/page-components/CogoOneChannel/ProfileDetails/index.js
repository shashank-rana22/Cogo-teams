import { useState } from 'react';

import COMPONENT_MAPPING from '../../../constants/COMPONENT_MAPPING';
import useCheckChannelPartner from '../../../hooks/useCheckChannelPartner';
import useListOmnichannelDocuments from '../../../hooks/useListOmnichannelDocuments';
import getActiveCardDetails from '../../../utils/getActiveCardDetails';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails({
	activeMessageCard,
	activeTab,
	activeVoiceCard,
	updateLeaduser,
	activeCardId,
	setModalType = () => {},
	setActiveMessage = () => {},
}) {
	const customerId = activeTab === 'message' ? activeMessageCard?.id : activeVoiceCard?.id;

	const [activeSelect, setActiveSelect] = useState('profile');
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
					/>
				)}
			</div>

			<RightSideNav
				activeSelect={activeSelect}
				setActiveSelect={setActiveSelect}
				openNewTab={openNewTab}
				loading={loading}
				disableQuickActions={disableQuickActions}
				documents_count={documents_count}
				activeMessageCard={activeMessageCard}
				activeVoiceCard={activeVoiceCard}
				activeTab={activeTab}
			/>
		</div>
	);
}

export default ProfileDetails;
