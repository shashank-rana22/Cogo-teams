import AgentDetails from '../page-components/CogoOneChannel/ProfileDetails/AgentDetails';
import AgentNotes from '../page-components/CogoOneChannel/ProfileDetails/AgentNotes';
import AgentReminder from '../page-components/CogoOneChannel/ProfileDetails/AgentReminder';
import CustomerInsight from '../page-components/CogoOneChannel/ProfileDetails/CustomerInsight';
import Documents from '../page-components/CogoOneChannel/ProfileDetails/Document';
import FlashReverts from '../page-components/CogoOneChannel/ProfileDetails/FlashReverts';
import HelpDesk from '../page-components/CogoOneChannel/ProfileDetails/HelpDesk';
import OrganizationDetails from '../page-components/CogoOneChannel/ProfileDetails/OrganizationDetails';
import QuickActions from '../page-components/CogoOneChannel/ProfileDetails/QuickActions';
import Tickets from '../page-components/CogoOneChannel/ProfileDetails/Tickets';
import UserActivities from '../page-components/CogoOneChannel/ProfileDetails/UserActivity';

const COMPONENT_MAPPING = {
	profile                 : AgentDetails,
	organization            : OrganizationDetails,
	user_activity           : UserActivities,
	reminder                : AgentReminder,
	notes                   : AgentNotes,
	quick_actions           : QuickActions,
	customer_insights       : CustomerInsight,
	help_desk               : HelpDesk,
	documents               : Documents,
	tickets                 : Tickets,
	flash_shipment_bookings : FlashReverts,
};

export default COMPONENT_MAPPING;
