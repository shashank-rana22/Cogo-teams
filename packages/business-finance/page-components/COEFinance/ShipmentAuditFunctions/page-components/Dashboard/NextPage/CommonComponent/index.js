import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDummyCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

export default function CommonComponent() {
	return (
		<div>
			{/* <div className={styles.status_accordian}>
				<Pill color="#B4F3BE">Approved</Pill>
			</div> */}
			<div style={{ display: 'flex', width: '100%' }}>
				<div className={styles.vertical_timeline}>

					{ index !== FIFTH_INDEX
						? (
							<>
								<IcMDummyCircle
									fill="#EE3425"
									height="20"
									width="20"
								/>
								<div className={styles.vertical_rule} />
							</>
						)
						: (
							<IcMDummyCircle
								fill="#EE3425"
								height="20"
								width="20"
								style={{ marginBottom: '24px' }}
							/>
						) }
				</div>
				<Accordian
					isOpen={isOpen}
					toggleAccordion={toggleAccordion}
					columnIndex={columnIndex}
					index={index}
					income={income}
					profitability={profitability}
				/>
			</div>
		</div>
	);
}
