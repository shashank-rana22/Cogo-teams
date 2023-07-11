import { Input, Tabs, TabPanel } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListShipmentPendingTasks from '../hooks/useListShipmentPendingTasks';

import ApprovedAWB from './ApprovedAWB';
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

	const [relevantToMe, setRelevantToMe] = useState(false);

	console.log('setRelevantToMe', setRelevantToMe);

	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || null;

	const {
		data, loading, page,
		setPage, listAPI, searchValue, setSearchValue,
	} = useListShipmentPendingTasks({ activeTab, relevantToMe });

	return (
		<div>
			<Header />
			<div className={styles.top_container}>
				<Tabs
					themeType="tertiary"
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{TABS.map((item) => {
						const { key = '', label = '' } = item;
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
					suffix={<IcMSearchlight className="search_icon" />}
					className={styles.input_search}
					placeholder="Search by SID or AWB Number"
					type="text"
					onChange={(val) => {
						setSearchValue(val);
					}}
				/>
			</div>

			{ActiveTabComponent && (
				<ActiveTabComponent
					key={activeTab}
					data={data}
					loading={loading}
					// setGenerate={setGenerate}
					// setItem={setItem}
					// setViewDoc={setViewDoc}
					// edit={edit}
					// setEdit={setEdit}
					page={page}
					setPage={setPage}
					listAPI={listAPI}
					activeTab={activeTab}
				/>
			)}

		</div>
	);
}

export default PrintingDesk;
