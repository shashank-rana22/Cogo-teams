import React, { useState, useEffect } from 'react';

import CargoHandoverAtOrigin from './components/CargoHandoverAtOrigin';
import CompletedTasks from './components/CompletedTasks';
import GenerateFinalAirwayBill from './components/GenerateFinalAirwayBill';
import UpdateOriginCustom from './components/UpdateOriginCustom';
import useListShipmentPendingTasks from './hooks/useListShipmentPendingTasks';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'cargo_handover_at_origin_date',
		label : 'Cargo handover at origin Date',
	},
	{
		key   : 'update_origin_custom_date',
		label : 'Update Origin Custom Date',
	},
	{
		key   : 'generate_final_airway_bill',
		label : 'Generate Final Airway Bill',
	},
	{
		key   : 'completed_tasks',
		label : 'Completed Tasks',
	},
];

const tabsComponentMapping = {
	cargo_handover_at_origin_date : CargoHandoverAtOrigin,
	update_origin_custom_date     : UpdateOriginCustom,
	generate_final_airway_bill    : GenerateFinalAirwayBill,
	completed_tasks               : CompletedTasks,
};

function Air() {
	const [subActiveTab, setSubActiveTab] = useState(tabs[0].key);

	const ActiveTabComponent = tabsComponentMapping[subActiveTab] || null;

	const onChange = (view) => {
		setSubActiveTab(view);
	};

	const { data, listAPi } = useListShipmentPendingTasks();

	useEffect(() => {
		if (subActiveTab === 'cargo_handover_at_origin_date') { listAPi(); }
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
			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} data={data} />}
		</div>
	);
}

export default Air;
