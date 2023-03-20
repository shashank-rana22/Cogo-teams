import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function AnalyticsLoader() {
	return (
		<div className={styles.container}>
			<div className={styles.pills_container}>
				<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />
				<div className={styles.flex_center}>
					<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />
					<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />
					<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />
					<Placeholder height="20px" width="125px" margin="0px 0px 20px 0px" />
				</div>
			</div>
			<div style={{ display: 'flex' }}>
				<div className={styles.cards}>
					<div className={styles.card_heading}>
						<Placeholder height="25px" width="125px" margin="0px 0px 12px 0px" />
					</div>
					<div className={styles.card_content}>
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
					</div>
				</div>
				<div className={styles.cards}>
					<div className={styles.card_heading}>
						<Placeholder height="25px" width="125px" margin="0px 0px 12px 0px" />
					</div>
					<div className={styles.card_content}>
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
					</div>
				</div>
				<div className={styles.cards}>
					<div className={styles.card_heading}>
						<Placeholder height="25px" width="125px" margin="0px 0px 12px 0px" />
					</div>
					<div className={styles.card_content}>
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
					</div>
				</div>
				<div className={styles.cards}>
					<div className={styles.card_heading}>
						<Placeholder height="25px" width="125px" margin="0px 0px 12px 0px" />
					</div>
					<div className={styles.card_content}>
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
						<Placeholder height="15px" width="280px" margin="0px 0px 10px 0px" />
					</div>
				</div>
			</div>
		</div>

	);
}

export default AnalyticsLoader;
