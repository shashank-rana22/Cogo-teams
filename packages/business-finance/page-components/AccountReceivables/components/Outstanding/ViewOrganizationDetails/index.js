import { Button } from '@cogoport/components';
import React from 'react';

import OutstandingList from '../OverAllOutstanding/OutstandingList';

import styles from './styles.module.css';

function ViewOrganizationDetails({ selectedOrgId = {}, setSelectedOrgId = () => {}, entityCode = '' }) {
	return (
		<div>
			<div className={styles.button_div}>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => setSelectedOrgId({})}
				>
					Go Back

				</Button>
			</div>
			<OutstandingList
				item={selectedOrgId}
				entityCode={entityCode}
				showElement
				organizationId={selectedOrgId?.organizationId || ''}
			/>
		</div>
	);
}

export default ViewOrganizationDetails;
