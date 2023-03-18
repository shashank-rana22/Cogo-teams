import { Toggle, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function DailyPayableOutstanding() {
	const [isQuarterView, setIsQuarterView] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Daily Payable Outstanding
						<div className={styles.hr} />
					</div>
					<Tooltip placement="top" content="jaiprakash">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.toggle}>
					<div className={styles.heading_text}>
						Quarter View
					</div>
					<Toggle
						name="view"
						size="md"
						showOnOff
						value={isQuarterView}
						onChange={() => setIsQuarterView(!isQuarterView)}
						disabled={false}
					/>
				</div>
			</div>
			{!isQuarterView
				? (
					<div className={styles.sub_container}>
						<div className={styles.month_container}>
							<div className={styles.value}>
								25.20
							</div>
							<div className={styles.label}>
								current month - march 2022
							</div>
						</div>
						<div className={styles.month_container}>
							<div className={styles.value}>
								20.12
							</div>
							<div className={styles.label}>
								February 2022
							</div>
						</div>
						<div className={styles.month_container}>
							<div className={styles.value}>
								24.90
							</div>
							<div className={styles.label}>
								January 2022
							</div>
						</div>
					</div>
				) : (
					<div className={styles.sub_container}>
						<div className={styles.month_box}>
							<div className={styles.value}>
								25.20
							</div>
							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q1
								</div>
								<div className={styles.label}>
									-Jan-Feb-March
								</div>
							</div>

						</div>
						<div className={styles.month_box}>
							<div className={styles.value}>
								23.20
							</div>

							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q2
								</div>
								<div className={styles.label}>
									- Apr-May-Jun
								</div>
							</div>

						</div>
						<div className={styles.month_box}>
							<div className={styles.value}>
								22.80
							</div>
							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q3
								</div>
								<div className={styles.label}>
									- Jul-Aug-Sep
								</div>
							</div>

						</div>
						<div className={styles.month_box}>
							<div className={styles.value}>
								26.70
							</div>
							<div className={styles.sub_container}>
								<div className={styles.quarter_text}>
									Q4
								</div>
								<div className={styles.label}>
									- Oct-Nov-Dec
								</div>
							</div>
						</div>
					</div>
				)}
		</div>
	);
}

export default DailyPayableOutstanding;
