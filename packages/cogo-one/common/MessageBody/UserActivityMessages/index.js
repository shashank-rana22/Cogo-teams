import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

// import CheckoutDetails from './CheckoutDetails';
import Default from './Default';
import EmailClicked from './EmailClicked';
import LoginFailed from './LoginFailed';
import Shipments from './Shipments';
// import Shipments from './ShipmentDetails';
// import SpotSearchDetails from './SpotSearchDetails';

const COMPONENT_MAPPING = {
	checkout      : Shipments,
	shipment      : Shipments,
	user          : LoginFailed,
	communication : EmailClicked,
	default       : Default,
	spot_search   : Shipments,
};

const ICON_MAPPING = {
	checkout      : GLOBAL_CONSTANTS.image_url.checkout_failed,
	shipment      : GLOBAL_CONSTANTS.image_url.abandon_shipmemts,
	user          : GLOBAL_CONSTANTS.image_url.login_failed,
	communication : GLOBAL_CONSTANTS.image_url.email_clicked,
	default       : GLOBAL_CONSTANTS.image_url.login_failed,
	spot_search   : GLOBAL_CONSTANTS.image_url.abandon_shipmemts,
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
	const userActivityIcon = ICON_MAPPING[source] || ICON_MAPPING.default;

	return (
		<div>
			<Image
				src={userActivityIcon}
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
