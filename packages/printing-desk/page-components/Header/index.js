import { Input, Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMCross } from '@cogoport/icons-react';
import React from 'react';

import Filters from '../Filters';

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
];

function Header({
	searchValue = '',
	setSearchValue = () => {},
	activeTab = 'approved_awb',
	setActiveTab = () => {},
	filters = {},
	setFilters = () => {},
	setRelevantToMe = () => {},
}) {
	return (
		<header>
			<div className={styles.heading}>Printing Desk</div>
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
					size="sm"
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
						onChange={() => setRelevantToMe((prev) => !prev)}
					/>
					<Filters setFilters={setFilters} filters={filters} />
				</div>
			</div>

		</header>
	);
}

export default Header;
