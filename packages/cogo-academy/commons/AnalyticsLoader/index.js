import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function AnalyticsLoader() {
	return (
		<div className={styles.container}>
			<div className={styles.pills_container}>
				<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />
				<div className={styles.flex_center}>
					{[...Array(4)].map(() => (
						<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />))}

				</div>
			</div>
			<div style={{ display: 'flex' }}>
				{[...Array(4)].map(() => (
					<div className={styles.cards}>
						<div className={styles.card_heading}>
							<Placeholder height="25px" width="125px" margin="0px 0px 12px 0px" />
						</div>
						<div className={styles.card_content}>
							{[...Array(2)].map(() => (
								<Placeholder height="15px" width="100%" margin="0px 0px 10px 0px" />))}

						</div>
					</div>
				))}

			</div>
		</div>

	);
}

export default AnalyticsLoader;
