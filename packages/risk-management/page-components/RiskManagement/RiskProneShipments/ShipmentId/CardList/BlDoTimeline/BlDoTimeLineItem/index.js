import { IcMFtick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function BlDoTimeLineItem() {
	return (
		<div className={styles.div_container}>
			<div className={styles.container} style={{ marginLeft: '254px', marginBottom: '28px' }}>
				<div className={styles.dull_line} />
				<div className={styles.tick_circle1}>
					<div className={styles.text}>
						ETD
					</div>
					<div className={styles.text}>
						20 March 2022
					</div>
					<div className={styles.dull_circle} />

				</div>
				<div className={styles.dull_line} />
				<div className={styles.tick_circle1}>
					<div className={styles.text}>
						ETA
					</div>
					<div className={styles.text}>
						20 March 2022
					</div>
					<div className={styles.dull_circle} />

				</div>
				<div className={styles.dull_line} />
				<div className={styles.tick_circle1}>
					<div className={styles.text}>
						Delivery
					</div>
					<div className={styles.text}>
						20 March 2022
					</div>
					<div className={styles.dull_circle} />

				</div>
			</div>
			<div>
				<div className={styles.container} style={{ marginTop: '-60px' }}>
					<div className={styles.tick_circle}>
						<div>
							<IcMFtick
								height={20}
								width={20}
								color="#F68B21"
							/>
						</div>
						<div className={styles.text}>
							Pick Up
						</div>
						<div className={styles.text}>
							Actual : 20 March 2022
						</div>
					</div>

					<div className={styles.fill_color} />
					<div className={styles.tick_circle}>
						<div>
							<IcMFtick
								height={20}
								width={20}
								color="#F68B21"
							/>
						</div>
					</div>
				</div>

				<div className={styles.container} style={{ marginLeft: '254px', marginTop: '-60px' }}>
					<div className={styles.dull_line} />
					<div className={styles.tick_circle}>
						<div className={styles.dull_circle} />
						<div className={styles.text}>
							ETD
						</div>
						<div className={styles.text}>
							20 March 2022
						</div>
					</div>
					<div className={styles.dull_line} />
					<div className={styles.tick_circle}>
						<div className={styles.dull_circle} />
						<div className={styles.text}>
							ETA
						</div>
						<div className={styles.text}>
							20 March 2022
						</div>
					</div>
					<div className={styles.dull_line} />
					<div className={styles.tick_circle}>
						<div className={styles.dull_circle} />
						<div className={styles.text}>
							Delivery
						</div>
						<div className={styles.text}>
							20 March 2022
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container} style={{ marginLeft: '714px', marginTop: '-140px', width: '56%' }}>
				<div className={styles.dull_line} />
				<div className={styles.tick_circle}>
					<div className={styles.dull_circle} />
					<div className={styles.text}>
						ETD
					</div>
					<div className={styles.text}>
						20 March 2022
					</div>
				</div>
				<div className={styles.dull_line} />
				<div className={styles.tick_circle}>
					<div className={styles.dull_circle} />
					<div className={styles.text}>
						ETA
					</div>
					<div className={styles.text}>
						20 March 2022
					</div>
				</div>
				<div className={styles.dull_line} />
				<div className={styles.tick_circle}>
					<div className={styles.dull_circle} />
					<div className={styles.text}>
						Delivery
					</div>
					<div className={styles.text}>
						20 March 2022
					</div>
				</div>
			</div>
		</div>
	);
}

export default BlDoTimeLineItem;
