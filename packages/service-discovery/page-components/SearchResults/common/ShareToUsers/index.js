import { useState } from 'react';

import ShareToUsersModal from './ShareToUsersModal';
import SuccessModal from './SuccessModal';

function ShareToUsers({
	shareType = '',
	rate = {},
	show = false,
	source = '',
	onClose = () => {},
	org_id = '',
	comparedRateCardDetails = [],
}) {
	const [showSuccess, setShowSuccess] = useState(false);

	const onSuccess = () => {
		setShowSuccess(true);
	};

	const COMPONENT_MAPPING = {
		true: {
			component : SuccessModal,
			props     : {
				show        : showSuccess,
				setShow     : setShowSuccess,
				onClose,
				title       : 'Rate Shared',
				description : `Rates have been shared to the user. 
				They will receive an mail to view the rates on platform.`,
			},
		},
		false: {
			component : ShareToUsersModal,
			props     : {
				source,
				shareType,
				onSuccess,
				onClose,
				rate,
				org_id,
				comparedRateCardDetails,
				show,
			},
		},
	};

	const { component: ActiveComponent, props = {} } = COMPONENT_MAPPING[showSuccess];

	return (
		<ActiveComponent {...props} />
	);
}

export default ShareToUsers;
