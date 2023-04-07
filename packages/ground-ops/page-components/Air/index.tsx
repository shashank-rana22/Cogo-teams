import { Input, Toggle, Placeholder } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Filters from '../Filters';

import ApprovalPending from './components/ApprovalPending';
import ApprovedAWB from './components/ApprovedAWB';
import FinalAWB from './components/FinalAWB';
import NewAWB from './components/NewAWB';
import useListShipmentPendingTasks from './hooks/useListShipmentPendingTasks';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'new_awb',
		label : 'New AWB',
		count : 'newAwbCount',
	},
	{
		key   : 'approval_pending',
		label : 'Approval Pending',
		count : 'approvalPendingCount',
	},
	{
		key   : 'approved_awb',
		label : 'Approved AWB',
		count : 'approvedAwbCount',
	},
	{
		key   : 'final_awb',
		label : 'Final AWB',
		count : 'finalAwbCount',
	},
];

const tabsComponentMapping = {
	new_awb          : NewAWB,
	approval_pending : ApprovalPending,
	approved_awb     : ApprovedAWB,
	final_awb        : FinalAWB,
};

function Air({ setGenerate, setItem, setViewDoc, edit, setEdit }) {
	const [activeTab, setActiveTab] = useState(tabs[0].key);
	const [filters, setFilters] = useState({});
	const [relevantToMe, setRelevantToMe] = useState(false);

	const ActiveTabComponent = tabsComponentMapping[activeTab] || null;

	const onChange = (view) => {
		setActiveTab(view);
	};

	const {
		data, loading, page,
		setPage, listAPI, searchValue, setSearchValue,
	} = useListShipmentPendingTasks({ activeTab, filter: filters, relevantToMe });

	useEffect(() => {
		listAPI();
	}, [activeTab, listAPI]);

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
								className={`${styles.container_click} 
								${tab.key === activeTab ? styles.sub_container_click : styles.sub_container}`}
							>
								{tab.label}
								{loading ? <Placeholder width="20px" margin="0px 0px 0px 10px" />
									: <div className={styles.stats}>{data?.data?.stats[tab.count] || 0}</div>}

							</div>

						</div>
					))}
				</div>
			</div>
			<div className={styles.filters_container}>
				<Input
					value={searchValue}
					suffix={<IcMSearchlight className="search_icon" />}
					className={styles.input_search}
					style={{ width: '260px', height: '26px' }}
					placeholder="Search by SID or AWB Number"
					type="text"
					onChange={(val) => {
						setSearchValue(val);
					}}
				/>
				<div className={styles.flex}>
					<Toggle
						name="stakeholder_id"
						size="sm"
						disabled={false}
						onLabel="Relevent to me"
						offLabel="All"
						onChange={() => setRelevantToMe((p) => !p)}
					/>
					<Filters setFilters={setFilters} filters={filters} />
				</div>
			</div>
			{ActiveTabComponent && (
				<ActiveTabComponent
					key={activeTab}
					data={data}
					loading={loading}
					setGenerate={setGenerate}
					setItem={setItem}
					setViewDoc={setViewDoc}
					edit={edit}
					setEdit={setEdit}
					page={page}
					setPage={setPage}
					listAPI={listAPI}
					activeTab={activeTab}
				/>
			)}
		</div>
	);
}

export default Air;
