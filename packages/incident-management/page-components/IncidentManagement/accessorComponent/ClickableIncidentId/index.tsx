import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React from 'react';

import styles from './styles.module.css';

function ClickableIncidentId({ itemData }) {
	const { userIncidentStatus, referenceId, id } = itemData || {};
	const { push } = useRouter();
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { id:userId = '' } } = UserData;

	const handleTabChange = () => {
		push(
			// eslint-disable-next-line max-len
			`/incident-management/[activeIncidentTab]?newIncidentId=${id}&userIncidentStatus=REQUESTED&performedBy=${userId}`,
			`/incident-management/requested?newIncidentId=${id}&userIncidentStatus="REQUESTED"&performedBy=${userId}`,
		);
		setTimeout(() => {
			window.location.reload();
		}, 500);
	};
	return (
		<div className={styles.container}>

			{userIncidentStatus === 'RAISED_AGAIN'
				? (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<div className={styles.clickable} onClick={handleTabChange}>
						{referenceId}
					</div>
				) : (
					<div>
						{referenceId}
					</div>
				)}
		</div>
	);
}

export default ClickableIncidentId;
