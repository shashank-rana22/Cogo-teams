import AgentTimeLine from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/AgentTimeLine';
import CommunicationActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/CommunicationActivity';
import PlatformActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/PlatformActivity';
import TransactionalActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/TransactionalActivity';

function getUserActivityComponent(activityTab, activeSubTab) {
	switch (activityTab) {
		case 'platform':
			return PlatformActivity;
		case 'transactional':
			return TransactionalActivity;
		case 'communication':
			return activeSubTab === 'channels'
				? CommunicationActivity : AgentTimeLine;
		default:
			return null;
	}
}

export default getUserActivityComponent;
