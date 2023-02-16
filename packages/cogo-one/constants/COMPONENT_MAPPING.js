import AgentDetails from '../page-components/ProfileDetails/AgentDetails';
import AgentNotes from '../page-components/ProfileDetails/AgentNotes';
import AgentReminder from '../page-components/ProfileDetails/AgentReminder';
import CustomerInsight from '../page-components/ProfileDetails/CustomerInsight';
import OrganizationDetails from '../page-components/ProfileDetails/OrganizationDetails';
import QuickActions from '../page-components/ProfileDetails/QuickActions';
import UserActivities from '../page-components/ProfileDetails/UserActivity';

const COMPONENT_MAPPING = {
	profile           : AgentDetails,
	organization      : OrganizationDetails,
	user_activity     : UserActivities,
	reminder          : AgentReminder,
	notes             : AgentNotes,
	quick_actions     : QuickActions,
	customer_insights : CustomerInsight,
};

export default COMPONENT_MAPPING;
