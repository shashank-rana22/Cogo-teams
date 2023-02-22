import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Filters from '../Filters';

import ApprovalPending from './components/ApprovalPending';
import CompletedTasks from './components/CompletedTasks';
import GenerateFinalAirwayBill from './components/GenerateFinalAirwayBill';
import NewAWB from './components/NewAWB';
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
	approval_pending : ApprovalPending,
	approved_awb     : GenerateFinalAirwayBill,
	completed_awb    : CompletedTasks,
};

function Air({ setGenerate, setItem }) {
	const [activeTab, setActiveTab] = useState(tabs[0].key);

	const ActiveTabComponent = tabsComponentMapping[activeTab] || null;

	const onChange = (view) => {
		setActiveTab(view);
	};

	const { data, loading, listAPi } = useListShipmentPendingTasks();

	useEffect(() => {
		if (activeTab === 'new_awb') { listAPi(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

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
								className={tab.key === activeTab ? styles.sub_container_click : styles.sub_container}
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
			{ActiveTabComponent && (
				<ActiveTabComponent
					key={activeTab}
					data={data}
					loading={loading}
					setGenerate={setGenerate}
					setItem={setItem}
				/>
			)}
		</div>
	);
}

export default Air;
