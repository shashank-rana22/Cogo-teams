import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import OutstandingList from '../OverAllOutstanding/OutstandingList';

import styles from './styles.module.css';

function ViewOrganizationDetails({ selectedOrgId = {}, setSelectedOrgId = () => {} }) {
	const router = useRouter();

	const {
		entityCode = '', organizationId = '',
	} = router.query || {};

	return (
		<div>
			<div className={styles.button_div}>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => setSelectedOrgId(null)}
				>
					Go Back

				</Button>
			</div>
			<OutstandingList
				item={selectedOrgId}
				entityCode={entityCode}
				showElement
				organizationId={organizationId}
			/>
		</div>
	);
}

export default ViewOrganizationDetails;
