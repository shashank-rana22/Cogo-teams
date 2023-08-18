import { Modal, Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import GrantAccess from './GrantAccess';

function GrantOutlookAccess() {
	const { t } = useTranslation(['profile']);
	const email = useSelector((state) => state?.profile?.user?.email);

	const [showAccessUrl, setAccessUrl] = useState(false);

	return (
		<div>
			<Button
				className="primary sm"
				style={{ marginLeft: 10 }}
				onClick={() => setAccessUrl(true)}
			>
				{t('profile:allow_mails')}
			</Button>
			<Modal
				show={showAccessUrl}
				onClose={() => setAccessUrl(false)}
				className="primary md"
				styles={{ dialog: { overflow: 'visible' } }}
			>
				<Modal.Header title={t('profile:allow_mails_heading')} />
				<Modal.Body>
					<GrantAccess
						email={email}
						showAccessUrl={showAccessUrl}
					/>
				</Modal.Body>

			</Modal>
		</div>
	);
}

export default GrantOutlookAccess;
