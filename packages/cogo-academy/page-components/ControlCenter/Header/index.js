import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import ApprovalsModal from '../Approvals';
import useListPlatformConfigConstants from '../Approvals/Hooks/useListPlatformConfig';

import styles from './styles.module.css';

function Header({
	isConfigurationAllowed = false,
}) {
	const router = useRouter();
	const profile = useSelector((state) => state.profile || {});

	const { user } = profile || {};
	const { email } = user || {};

	const [showApprovalsModal, setShowApprovalsModal] = useState(false);
	const { data:emailsData } = useListPlatformConfigConstants();

	const { list = [] } = emailsData || {};
	const { platform_config_constant_mappings = [] } = list[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { value = [] } = platform_config_constant_mappings[GLOBAL_CONSTANTS.zeroth_index] || {};

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
				{value.includes(email) ? (
					<div>
						<Button onClick={() => setShowApprovalsModal(true)}>
							Approvals
						</Button>
					</div>
				) : null}

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
