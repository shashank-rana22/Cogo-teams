import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMOceanSchedules, IcMAirport } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function AccordianCards() {
	const iconMapping = {
		air_freight : <IcMAirport height={20} width={20} />,
		fcl_freight : <IcMOceanSchedules height={24} width={24} />,
	};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.icon_div}>
					<div className={styles.icons}>{iconMapping.fcl_freight}</div>
					<div className={styles.texts}>Ocean</div>
					<div className={styles.amount_div}>
						<Tooltip
							content="Profit : INR 10,00,000.34 (AR - AP)"
							placement="top"
							caret={false}
						>
							<div className={styles.amounts}><Pill size="xl" color="green">INR 10,00,000</Pill></div>
						</Tooltip>
					</div>
					<div className={styles.border} />
					<div className={styles.ar_amount}>AR : INR 40,00,000</div>
					<div className={styles.ar_amount}>AP : INR 30,00,000</div>
				</div>
				<div className={styles.view_button}>
					<Button size="md" themeType="secondary">View More</Button>
				</div>
			</div>
		</div>
	);
}

export default AccordianCards;
