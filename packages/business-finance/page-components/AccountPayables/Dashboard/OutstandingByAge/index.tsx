import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function OutstandingByAge() {
	return (
		<div className={styles.container}>

			<div className={styles.heading_text}>
				<div className={styles.text}>
					Outstanding
					<div className={styles.heading}>
						By Age
						<Tooltip placement="top" content="jaiprakash">
							<div className={styles.info_icon}>
								<IcMInfo width="16px" height="16px" />
							</div>
						</Tooltip>
					</div>
				</div>

			</div>
			<div className={styles.vr} />
		</div>
	);
}
export default OutstandingByAge;
