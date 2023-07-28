import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PocUser({ stakeHoldersData = [] }) {
	if (isEmpty(stakeHoldersData)) {
		return "No POC's found";
	}

	return (
		<div className={styles.pocusers_container}>
			{stakeHoldersData.map(
				(userDetails) => {
					const { stakeholder_type = '', user = {}, id = '' } = userDetails;

					const { name = '' } = user || {};

					return (
						<div className={styles.container} key={id}>
							<div className={styles.user_details}>
								<div className={styles.user_name}>
									{startCase(name)}
								</div>

								<div className={cl`${styles.user_name} ${styles.user_role}`}>
									{startCase(stakeholder_type)}
								</div>
							</div>

							<Image
								src={GLOBAL_CONSTANTS.image_url.message_reply}
								height={25}
								width={25}
								alt="message"
							/>
						</div>
					);
				},
			)}
		</div>
	);
}

export default PocUser;
