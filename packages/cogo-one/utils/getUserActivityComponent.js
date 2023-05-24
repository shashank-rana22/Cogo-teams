import AgentTimeLine from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/AgentTimeLine';
import CommunicationActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/CommunicationActivity';
import PlatformActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/PlatformActivity';
import Summary from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/Summary';
import TransactionalActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/TransactionalActivity';

function getUserActivityComponent(activityTab, activeSubTab) {
	if (activityTab === 'platform') {
		return PlatformActivity;
	}
	if (activityTab === 'transactional') {
		return TransactionalActivity;
	}
	if (activeSubTab === 'channels') {
		return CommunicationActivity;
	}
	if (activeSubTab === 'agent') {
		return AgentTimeLine;
	}
	return Summary;
}

export default getUserActivityComponent;
