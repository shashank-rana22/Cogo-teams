import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import { getEventTitle } from '../../../utils/getEventTitle';

import EmailClicked from './EmailClicked';
import KycEvent from './KycEvent';
import LoginFailed from './LoginFailed';
import Shipments from './Shipments';
import SignUpEvents from './SignUpEvents';
import styles from './styles.module.css';

function Default({ name = '', scope = '' }) {
	const eventTitle = getEventTitle({ name });

	return (
		<div className={styles.title}>
			{scope ? <div className={styles.user_scope}>{startCase(scope)}</div> : null}
			{startCase(eventTitle) || 'User Event'}
		</div>
	);
}

const COMPONENT_MAPPING = {
	checkout      : Shipments,
	shipment      : Shipments,
	user          : LoginFailed,
	communication : EmailClicked,
	default       : Default,
	spot_search   : Shipments,
	lead_user     : SignUpEvents,
	organization  : KycEvent,
};

const IMAGE_URL_MAPPING = {
	checkout      : GLOBAL_CONSTANTS.image_url.checkout_failed,
	shipment      : GLOBAL_CONSTANTS.image_url.abandon_shipmemts,
	user          : GLOBAL_CONSTANTS.image_url.login_failed,
	communication : GLOBAL_CONSTANTS.image_url.email_clicked,
	default       : GLOBAL_CONSTANTS.image_url.default_event,
	spot_search   : GLOBAL_CONSTANTS.image_url.abandon_shipmemts,
	lead_user     : GLOBAL_CONSTANTS.image_url.sign_up_failed,
	organization  : GLOBAL_CONSTANTS.image_url.kyc_event,
};

function UserActivityMessages({ eachMessage = {}, formattedData = {} }) {
	const {
		name = '',
		service_details: serviceData = {},
		source = '',
		data = {},
		scope = '',
	} = eachMessage;

	const ActiveModalComp = COMPONENT_MAPPING[source] || COMPONENT_MAPPING.default;
	const activeImageUrl = IMAGE_URL_MAPPING[source] || IMAGE_URL_MAPPING.default;

	return (
		<div>
			<Image
				src={activeImageUrl}
				alt="status-icon"
				width={25}
				height={25}
			/>

			{ActiveModalComp && (
				<ActiveModalComp
					serviceData={serviceData}
					eventType={source}
					name={name}
					formattedData={formattedData}
					data={data}
					scope={scope}
				/>
			)}

		</div>
	);
}

export default UserActivityMessages;
