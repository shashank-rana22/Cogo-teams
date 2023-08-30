import { Button } from '@cogoport/components';
import React from 'react';

import OutstandingList from '../OutstandingList';

import styles from './styles.module.css';

function ViewOrganizationDetails({ selectedOrg = {}, setSelectedOrg = () => {} }) {
	return (
		<div>
			<div className={styles.button_div}>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => setSelectedOrg(null)}
				>
					Go Back
				</Button>
			</div>
			<OutstandingList
				item={selectedOrg}
				showElement
			/>
		</div>
	);
}

export default ViewOrganizationDetails;
