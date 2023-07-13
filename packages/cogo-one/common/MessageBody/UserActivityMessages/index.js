import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import EmailClicked from './EmailClicked';
import LoginFailed from './LoginFailed';
import Shipments from './Shipments';

const COMPONENT_MAPPING = {
	checkout : Shipments,
	login    : LoginFailed,
	email    : EmailClicked,
};

const ICON_MAPPING = {
	checkout : GLOBAL_CONSTANTS.image_url.checkout_failed,
	login    : GLOBAL_CONSTANTS.image_url.login_failed,
	email    : GLOBAL_CONSTANTS.image_url.email_clicked,
};

function UserActivityMessages({
	serviceData = {},
	service = '',
}) {
	const ActiveModalComp = COMPONENT_MAPPING[service] || null;
	const userActivityIcon = ICON_MAPPING[service] || '';

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
					eventType={service}
				/>
			)}

		</div>
	);
}

export default UserActivityMessages;
