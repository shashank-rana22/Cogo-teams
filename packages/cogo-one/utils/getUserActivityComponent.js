import AgentTimeLine from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/AgentTimeLine';
import CommunicationActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/CommunicationActivity';
import PlatformActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/PlatformActivity';
import ShipmentActivities from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/ShipmentActivities';
import Summary from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/Summary';

function getUserActivityComponent({ activityTab = '', activeSubTab = '' }) {
	if (activityTab === 'platform') {
		return PlatformActivity;
	}
	if (activityTab === 'transactional') {
		return ShipmentActivities;
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
