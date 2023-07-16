import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import CheckoutDetails from './CheckoutDetails';
import EmailClicked from './EmailClicked';
import LoginFailed from './LoginFailed';
import Shipments from './ShipmentDetails';

const COMPONENT_MAPPING = {
	checkout      : CheckoutDetails,
	shipment      : Shipments,
	user          : LoginFailed,
	communication : EmailClicked,
};

const ICON_MAPPING = {
	checkout      : GLOBAL_CONSTANTS.image_url.checkout_failed,
	shipment      : GLOBAL_CONSTANTS.image_url.checkout_failed,
	user          : GLOBAL_CONSTANTS.image_url.login_failed,
	communication : GLOBAL_CONSTANTS.image_url.email_clicked,
};

function UserActivityMessages({ eachMessage = {}, formattedData = {} }) {
	const {
		name = '',
		service_details: serviceData = {},
		source = '',
		data = {},
	} = eachMessage;

	const ActiveModalComp = COMPONENT_MAPPING[source] || null;
	const userActivityIcon = ICON_MAPPING[source] || '';

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
				/>
			)}

		</div>
	);
}

export default UserActivityMessages;
