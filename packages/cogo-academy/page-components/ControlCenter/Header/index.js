import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import ApprovalsModal from '../Approvals';

import styles from './styles.module.css';

function Header({
	isConfigurationAllowed = false,
}) {
	const router = useRouter();
	const [showApprovalsModal, setShowApprovalsModal] = useState(false);

	const onClickConfiguration = () => {
		router.push(
			'/learning/faq/create/configuration',
			'/learning/faq/create/configuration',
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Control Center</div>
			<div className={styles.buttons_container}>

				<div>
					<Button onClick={() => setShowApprovalsModal(true)}>
						Approvals
					</Button>
				</div>

				{ isConfigurationAllowed && (
					<div className={styles.button_container}>
						<Button
							type="button"
							style={{ marginLeft: 8 }}
							themeType="secondary"
							onClick={onClickConfiguration}
						>
							Configuration
						</Button>
					</div>
				)}
				{showApprovalsModal ? (
					<ApprovalsModal
						showApprovalsModal={showApprovalsModal}
						setShowApprovalsModal={setShowApprovalsModal}
					/>
				) : null}
			</div>

		</div>
	);
}

export default Header;
