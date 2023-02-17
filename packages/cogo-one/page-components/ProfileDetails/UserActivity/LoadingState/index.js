import { Placeholder, cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function LoadingState({ activityTab }) {
	return (
		<div className={styles.list_container}>
			{[...Array(5)].map(() => (
				<>
					<div className={styles.activity_date}>
						<div className={styles.dot} />
						<Placeholder height="12px" width="90px" margin="0px 0px 0px 5px" />
					</div>
					<div className={styles.main_card}>

						<div className={cl`
			${styles.card}
			${activityTab === 'transactional' ? styles.card_transactional : ''}
			${activityTab === 'platform' ? styles.card_platform : ''}
			${activityTab === 'communication' ? styles.card_communication : ''}
			`}
						>
							<Placeholder height="18px" width="100px" />

							<div className={styles.booking_details}>
								<Placeholder height="15px" width="100px" />
								<Placeholder height="12px" width="100px" />
							</div>

							<div className={styles.port_pair}>
								<div className={styles.port}>
									<div className={styles.port_details}>
										<Placeholder height="12px" width="100px" />
									</div>
									<div className={styles.country}>
										<Placeholder height="12px" width="50px" margin="5px 0px 0px 0px" />
									</div>
								</div>
								<IcMPortArrow width={22} height={22} />
								<div className={styles.port}>
									<div className={styles.port_details}>
										<Placeholder height="12px" width="100px" />
									</div>
									<div className={styles.country}>
										<Placeholder height="12px" width="50px" margin="5px 0px 0px 0px" />
									</div>
								</div>
							</div>
						</div>

					</div>

				</>
			))}
			<div className={styles.activity_date}>
				<div className={styles.dot} />
			</div>
		</div>
	);
}

export default LoadingState;
