import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Filters from '../Filters';

import CompletedTasks from './components/CompletedTasks';
import GenerateFinalAirwayBill from './components/GenerateFinalAirwayBill';
import NewAWB from './components/NewAWB';
import UpdateOriginCustom from './components/UpdateOriginCustom';
import useListShipmentPendingTasks from './hooks/useListShipmentPendingTasks';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'new_awb',
		label : 'New AWB',
	},
	{
		key   : 'approval_pending',
		label : 'Approval Pending',
	},
	{
		key   : 'approved_awb',
		label : 'Approved AWB',
	},
	{
		key   : 'completed_awb',
		label : 'Completed AWB',
	},
];

const tabsComponentMapping = {
	new_awb          : NewAWB,
	approval_pending : UpdateOriginCustom,
	approved_awb     : GenerateFinalAirwayBill,
	completed_awb    : CompletedTasks,
};

function Air() {
	const [subActiveTab, setSubActiveTab] = useState(tabs[0].key);

	const ActiveTabComponent = tabsComponentMapping[subActiveTab] || null;

	const onChange = (view) => {
		setSubActiveTab(view);
	};

	const { data, loading, listAPi } = useListShipmentPendingTasks();

	useEffect(() => {
		if (subActiveTab === 'new_awb') { listAPi(); }
	}, [subActiveTab]);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.flex}>

					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								onChange(tab.key);
							}}
							role="presentation"
						>
							{' '}
							<div
								className={tab.key === subActiveTab ? styles.sub_container_click : styles.sub_container}
							>
								{tab.label}

							</div>

						</div>
					))}
				</div>
			</div>
			<div className={styles.filters_container}>
				<Input
					suffix={<IcMSearchlight className="search_icon" />}
					className={styles.input_search}
					style={{ width: '260px', height: '26px' }}
					placeholder="Search by SID or AWB Number"
					type="text"
				/>
				<Filters />
			</div>
			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} data={data} loading={loading} />}
		</div>
	);
}

export default Air;
