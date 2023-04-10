import CommunicationActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/CommunicationActivity';
import PlatformActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/PlatformActivity';
import TransactionalActivity from '../page-components/CogoOneChannel/ProfileDetails/UserActivity/TransactionalActivity';

const USER_ACTIVITY_COMPONENT_MAPPING = {
	platform      : PlatformActivity,
	communication : CommunicationActivity,
	transactional : TransactionalActivity,

};

export default USER_ACTIVITY_COMPONENT_MAPPING;
