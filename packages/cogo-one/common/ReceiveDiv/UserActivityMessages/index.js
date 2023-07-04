import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

// import CheckoutIncomplete from './CheckoutIncomplete';
import LoginFailed from './LoginFailed';
// import EmailClicked from './EmailClicked';

function UserActivityMessages() {
	return (
		<div>
			<Image
				src={GLOBAL_CONSTANTS.image_url.login_failed}
				alt="status-icon"
				width={25}
				height={25}
			/>
			<LoginFailed />
			{/* <CheckoutIncomplete /> */}
			{/* <EmailClicked /> */}
		</div>
	);
}

export default UserActivityMessages;
