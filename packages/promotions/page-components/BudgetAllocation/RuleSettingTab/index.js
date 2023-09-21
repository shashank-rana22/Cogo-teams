import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import AddRuleForm from './AddRuleForm';
import List from './List';
import styles from './styles.module.css';

const TABS_MAPPING = [
	{
		value : 'fcl_freight',
		label : 'FCL',
	},
	{
		value : 'lcl_freight',
		label : 'LCL',
	},
	{
		value : 'air_freight',
		label : 'AIR',
	},
	{
		value : 'ftl_freight',
		label : 'FTL',
	},
	{
		value : 'ltl_freight',
		label : 'LTL',
	},
	{
		value : 'fcl_freight_local',
		label : 'FCL locals',
	},
	{
		value : 'air_freight_local',
		label : 'AIR locals',
	},
	{
		value : 'fcl_customs',
		label : 'FCL customs',
	},
	{
		value : 'lcl_customs',
		label : 'LCL customs',
	},
	{
		value : 'air_customs',
		label : 'AIR customs',
	},
	{
		value : 'trailer_freight',
		label : 'Trailer freight',
	},
	{
		value : 'haulage_freight',
		label : 'Haulage freight',
	},
	{
		value : 'rail_domestic_freight',
		label : 'Rail Domestic',
	},
];

function RuleSettingTab() {
	const [activeService, setActiveService] = useState('fcl_freight');
	const [activeList, setActiveList] = useState('active');
	const [showAddRuleForm, setShowAddRuleForm] = useState(false);
	return (
		<div>
			{showAddRuleForm ? <AddRuleForm setShowAddRuleForm={setShowAddRuleForm} />
				: (
					<>
						<div className={styles.head}>
							<Tabs
								themeType="primary"
								activeTab={activeService}
								onChange={(val) => {
									setActiveService(val);
									setActiveList('active');
								}}
							>
								{TABS_MAPPING.map((item) => {
									const { label = '', value = '' } = item;
									return (
										<TabPanel
											themeType="primary"
											key={value}
											name={value}
											title={label}
										/>
									);
								})}
							</Tabs>
						</div>
						<List
							activeList={activeList}
							setActiveList={setActiveList}
							activeService={activeService}
							setShowAddRuleForm={setShowAddRuleForm}
						/>
					</>
				)}
		</div>
	);
}

export default RuleSettingTab;
