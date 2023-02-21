import { useState } from 'react';

import COMPONENT_MAPPING from '../../../constants/COMPONENT_MAPPING';
import useListOrganizations from '../../../hooks/useListOrganizations';
import getActiveCardDetails from '../../../utils/getActiveCardDetails';

import RightSideNav from './RightSideNav';
import styles from './styles.module.css';

function ProfileDetails({ activeMessageCard, activeTab, activeVoiceCard }) {
	const customerId = activeTab === 'message'
		? activeMessageCard?.id
		: activeVoiceCard?.id;

	const [activeSelect, setActiveSelect] = useState('profile');
	const ActiveComp = COMPONENT_MAPPING[activeSelect] || null;
	const FormattedMessageData = getActiveCardDetails(activeMessageCard) || {};
	const orgId = activeTab === 'message' ? FormattedMessageData?.organization_id : activeVoiceCard?.organization_id;

	const { data } = useListOrganizations({ orgId });
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
						FormattedMessageData={FormattedMessageData}
					/>
				)}
			</div>

			<RightSideNav
				activeMessageCard={activeMessageCard}
				activeVoiceCard={activeVoiceCard}
				activeSelect={activeSelect}
				activeTab={activeTab}
				setActiveSelect={setActiveSelect}
			/>
		</div>
	);
}
export default ProfileDetails;
