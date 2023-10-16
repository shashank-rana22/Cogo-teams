import { Input, Toggle, Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Filters from '../Filters';

import Amendment from './components/Amendment';
import ApprovalPending from './components/ApprovalPending';
import ApprovedAWB from './components/ApprovedAWB';
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
		key   : 'amendment',
		label : 'Amendment',
		count : 'amendmentCount',
	},
];

const TABS_STATS_MAPPING = {
	newAwbCount          : 'new_awb',
	approvalPendingCount : 'approval_pending',
	approvedAwbCount     : 'approved_awb',
	amendmentCount       : 'amendment',
};

const tabsComponentMapping = {
	new_awb          : NewAWB,
	approval_pending : ApprovalPending,
	approved_awb     : ApprovedAWB,
	amendment        : Amendment,
};

function Air({ setGenerate = () => {}, setItem = () => {}, setViewDoc = () => {}, edit = false, setEdit = () => {} }) {
	const [activeTab, setActiveTab] = useState(tabs[GLOBAL_CONSTANTS.zeroth_index].key);
	const [filters, setFilters] = useState({});
	const [relevantToMe, setRelevantToMe] = useState(false);
	const [maxStatsTabKey, setMaxStatsTabKey] = useState('new_awb');

	const ActiveTabComponent = tabsComponentMapping[activeTab] || null;

	const onChange = (view) => {
		setActiveTab(view);
	};

	const {
		data, loading, page,
		setPage, listAPI, searchValue, setSearchValue,
	} = useListShipmentPendingTasks({ activeTab, filter: filters, relevantToMe });

	const { data: { stats = {} } = {} } = data || {};

	useEffect(() => {
		if (searchValue) {
			const statsObj = stats || {};
			const statsObjValues = Object.values(statsObj) || [];
			const maxStats = Math.max(...statsObjValues);
			const maxStatsKey = Object.keys(statsObj).find((key) => statsObj[key] === maxStats);
			setMaxStatsTabKey(TABS_STATS_MAPPING[maxStatsKey]);
		}
	}, [searchValue, stats]);

	useEffect(() => {
		setActiveTab(maxStatsTabKey);
	}, [maxStatsTabKey]);

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
								className={cl`${styles.container_click}
								${tab.key === activeTab ? styles.sub_container_click : styles.sub_container}`}
							>
								{tab.label}
								{loading ? <Placeholder width="20px" margin="0px 0px 0px 10px" />
									: <div className={styles.stats}>{data?.data?.stats?.[tab.count] || 0}</div>}

							</div>

						</div>
					))}
				</div>
				<Input
					value={searchValue}
					suffix={<IcMSearchlight className="search_icon" />}
					className={styles.input_search}
					placeholder="Search by SID or AWB Number"
					type="text"
					onChange={(val) => {
						setSearchValue(val);
					}}
				/>
			</div>
			<div className={styles.filters_container}>
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
