import { Input, Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListShipmentPendingTasks from '../hooks/useListShipmentPendingTasks';

import ApprovedAWB from './ApprovedAWB';
import AWBDocument from './AWBDocument';
import EditAWB from './EditAWB';
import Filters from './Filters';
import Header from './Header';
import styles from './styles.module.css';

const TABS = [
	{
		key   : 'approved_awb',
		label : 'Approved AWB',
	},
	{
		key   : 'handed_over',
		label : 'Handed Over',
	},
	{
		key   : 'amendment',
		label : 'Amended',
	},
];

const TABS_COMPONENT_MAPPING = {
	approved_awb: ApprovedAWB,
};

function PrintingDesk() {
	const [activeTab, setActiveTab] = useState('approved_awb');
	const [filters, setFilters] = useState({});
	const [relevantToMe, setRelevantToMe] = useState(false);
	const [item, setItem] = useState({});
	const [viewDoc, setViewDoc] = useState(false);
	const [edit, setEdit] = useState(false);

	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || null;

	const {
		data, loading, page,
		setPage, listAPI, searchValue, setSearchValue,
	} = useListShipmentPendingTasks({ activeTab, filter: filters, relevantToMe });

	return (
		<div>
			<Header />
			<div className={styles.top_container}>
				<Tabs
					themeType="tertiary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{TABS.map((tab) => {
						const { key = '', label = '' } = tab;
						return (
							<TabPanel
								key={key}
								name={key}
								title={label}
							/>
						);
					})}
				</Tabs>
				<Input
					value={searchValue}
					suffix={(
						searchValue ? (
							<IcMCross
								className="cross_icon"
								onClick={() => setSearchValue('')}
								style={{ cursor: 'pointer' }}
							/>
						) : (
							<IcMSearchlight className="search_icon" />
						)
					)}
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

			{(viewDoc) && (
				<AWBDocument
					viewDoc={viewDoc}
					setViewDoc={setViewDoc}
					item={item}
					edit={edit}
					setEdit={setEdit}
					setItem={setItem}
				/>
			)}

			<EditAWB
				item={item}
				edit={edit}
				setEdit={setEdit}
			/>
		</div>
	);
}

export default PrintingDesk;
