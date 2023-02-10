import { Modal, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import GrantAccess from './GrantAccess';

function GrantOutlookAccess() {
	const email = useSelector((state) => state?.profile?.user?.email);

	const [showAccessUrl, setAccessUrl] = useState(false);
	return (
		<div>
			<Button
				className="primary sm"
				style={{ marginLeft: 10 }}
				onClick={() => setAccessUrl(true)}
			>
				Allow Mails
			</Button>
			<Modal
				show={showAccessUrl}
				onClose={() => setAccessUrl(false)}
				className="primary md"
				styles={{ dialog: { overflow: 'visible' } }}
			>
				<GrantAccess email={email} />
			</Modal>
		</div>
	);
}

export default GrantOutlookAccess;
