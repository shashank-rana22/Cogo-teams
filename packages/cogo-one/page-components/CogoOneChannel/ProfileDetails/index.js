import { useState } from 'react';

import COMPONENT_MAPPING from '../../../constants/COMPONENT_MAPPING';
import useListOrganizations from '../../../hooks/useListOrganizations';
import getActiveCardDetails from '../../../utils/getActiveCardDetails';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails({
	activeMessageCard,
	activeTab,
	activeVoiceCard,
	updateLeaduser,
	activeCardId,
	isomniChannelAdmin = false,
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
		disableQuickActions,
	} = useListOrganizations({ orgId, activeCardId, activeTab });

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
						isomniChannelAdmin={isomniChannelAdmin}
					/>
				)}
			</div>

			<RightSideNav
				activeSelect={activeSelect}
				setActiveSelect={setActiveSelect}
				openNewTab={openNewTab}
				loading={loading}
				disableQuickActions={disableQuickActions}
			/>
		</div>
	);
}
export default ProfileDetails;
