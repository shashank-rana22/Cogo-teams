import { Button, Accordion } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import KamLevelCard from './KamLevelCard';
import KamLevelDetails from './KamLevelDetails';
import styles from './styles.module.css';

function KamLevel() {
	return (
		<div>
			<div className={styles.container}>
				<div>
					<div className={styles.heading}>
						Currently Editing&nbsp;:&nbsp;
						<strong>Saved Draft</strong>
					</div>

					<div className={styles.sub_container}>
						<div className={styles.left_text}>
							Published On&nbsp;:&nbsp;
							<strong>{format(new Date(), 'dd MMM yyyy')}</strong>
						</div>

						<div>
							Published by&nbsp;:&nbsp;
							<strong>Cogoparth</strong>
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					<Button>Create Kam Level</Button>
					<Button themeType="secondary">Save as Draft</Button>
					<Button>Publish</Button>

				</div>
			</div>
			<div>
				<Accordion type="text" title={<KamLevelCard />} style={{ width: '100%' }} className={styles.accrodian}>
					<KamLevelDetails />
				</Accordion>
			</div>
		</div>

	);
}

export default KamLevel;
