import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';
import AgentTimeLine from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/AgentTimeLine';
import CommunicationActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/CommunicationActivity';
import PlatformActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/PlatformActivity';
import ShipmentActivities from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/ShipmentActivities';
import Summary from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/Summary';
import TransactionalActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/TransactionalActivity';

function getUserActivityComponent({ activityTab = '', activeSubTab = '', viewType = '' }) {
	const showShipments = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.show_shipments_home_page;

	if (activityTab === 'platform') {
		return PlatformActivity;
	}
	if (showShipments && activityTab === 'transactional') {
		return ShipmentActivities;
	}
	if (!showShipments && activityTab === 'transactional') {
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
