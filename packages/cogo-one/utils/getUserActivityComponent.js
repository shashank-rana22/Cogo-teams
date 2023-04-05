import AgentTimeLine from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/AgentTimeLine';
import CommunicationActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/CommunicationActivity';
import PlatformActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/PlatformActivity';
import Summary from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/Summary';
import TransactionalActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/TransactionalActivity';

function getUserActivityComponent(activityTab, activeSubTab) {
	switch (activityTab) {
		case 'platform':
			return PlatformActivity;
		case 'transactional':
			return TransactionalActivity;
		case 'communication':
			if (activeSubTab === 'channels') return CommunicationActivity;
			if (activeSubTab === 'agent') return AgentTimeLine;
			return Summary;
		default:
			return null;
	}
}

export default getUserActivityComponent;
