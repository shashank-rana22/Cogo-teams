import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Filters from '../Filters';

import ApprovalPending from './components/ApprovalPending';
import ApprovedAWB from './components/ApprovedAWB';
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
];

const tabsComponentMapping = {
	new_awb          : NewAWB,
	approval_pending : ApprovalPending,
	approved_awb     : ApprovedAWB,
};

function Air({ setGenerate, setItem, setViewDoc, setEdit }) {
	const [activeTab, setActiveTab] = useState(tabs[0].key);
	const [filters, setFilters] = useState({});

	const ActiveTabComponent = tabsComponentMapping[activeTab] || null;

	const onChange = (view) => {
		setActiveTab(view);
	};

	const {
		data, loading, page,
		setPage, listAPi, searchValue, setSearchValue,
	} = useListShipmentPendingTasks({ activeTab });

	useEffect(() => {
		listAPi({ filter: filters });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);

	useEffect(() => {
		if (searchValue === '') { listAPi({ filter: filters }); }
		setSearchValue('');
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
				<Filters setFilters={setFilters} filters={filters} />
			</div>
			{ActiveTabComponent && (
				<ActiveTabComponent
					key={activeTab}
					data={data}
					loading={loading}
					setGenerate={setGenerate}
					setItem={setItem}
					setViewDoc={setViewDoc}
					setEdit={setEdit}
					page={page}
					setPage={setPage}
					listAPi={listAPi}
				/>
			)}
		</div>
	);
}

export default Air;
