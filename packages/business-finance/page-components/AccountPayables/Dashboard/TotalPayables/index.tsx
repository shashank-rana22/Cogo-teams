import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import SegmentedControl from '../../../commons/SegmentedControl';

import styles from './styles.module.css';

interface ItemProps {
	payablesFilter:string;
	setPayablesFilter:Function;
}
const OPTIONS = [
	{
		label : 'Overall',
		value : 'overall',
	},
	{
		label : 'Logistics',
		value : 'logistics',
	},
	{
		label : 'Overheads',
		value : 'overheads',
	},
];

function TotalPayables({ payablesFilter, setPayablesFilter }:ItemProps) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading_text}>
					<div className={styles.text}>
						Total Payables
						<div className={styles.hr} />
					</div>
					<Tooltip placement="top" content="jaiprakash">
						<div className={styles.info_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
				<div className={styles.segmented_filter}>
					<SegmentedControl
						options={OPTIONS}
						activeTab={payablesFilter}
						setActiveTab={setPayablesFilter}
						color="#ED3726"
						background="#FFFAEB"
					/>
				</div>
			</div>
			<h1>hi</h1>
		</div>
	);
}

export default TotalPayables;
