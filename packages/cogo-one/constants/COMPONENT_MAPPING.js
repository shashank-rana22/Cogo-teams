import AddOnServices from '../page-components/CogoOneChannel/ProfileDetails/AddOnServices';
import AgentDetails from '../page-components/CogoOneChannel/ProfileDetails/AgentDetails';
import AgentNotes from '../page-components/CogoOneChannel/ProfileDetails/AgentNotes';
import AgentReminder from '../page-components/CogoOneChannel/ProfileDetails/AgentReminder';
import CustomerInsight from '../page-components/CogoOneChannel/ProfileDetails/CustomerInsight';
import Documents from '../page-components/CogoOneChannel/ProfileDetails/Document';
import FlashReverts from '../page-components/CogoOneChannel/ProfileDetails/FlashReverts';
import HelpDesk from '../page-components/CogoOneChannel/ProfileDetails/HelpDesk';
import OrganizationDetails from '../page-components/CogoOneChannel/ProfileDetails/OrganizationDetails';
import QuickActions from '../page-components/CogoOneChannel/ProfileDetails/QuickActions';
import RateReverts from '../page-components/CogoOneChannel/ProfileDetails/RateReverts';
import TeamsProfile from '../page-components/CogoOneChannel/ProfileDetails/TeamsProfile';
import UserActivities from '../page-components/CogoOneChannel/ProfileDetails/UserActivity';
import UserMails from '../page-components/CogoOneChannel/ProfileDetails/UserMails';

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
	flash_shipment_bookings : FlashReverts,
	add_on_services         : AddOnServices,
	user_mails              : UserMails,
	teams_profile           : TeamsProfile,
	smt_rate_reverts        : RateReverts,
};

export default COMPONENT_MAPPING;
