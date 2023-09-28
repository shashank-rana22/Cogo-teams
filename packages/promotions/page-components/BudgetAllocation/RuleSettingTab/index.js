import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import SERVICE_TABS_MAPPING from '../../../configs/SERVICE_TABS_MAPPING.json';

import AddRuleForm from './AddRuleForm';
import EditRuleForm from './EditRuleForm';
import List from './List';
import styles from './styles.module.css';

function RuleSettingTab() {
	const [activeService, setActiveService] = useState('fcl_freight');
	const [activeList, setActiveList] = useState('active');
	const [showAddRuleForm, setShowAddRuleForm] = useState(false);
	const [viewAndEditRuleId, setViewAndEditRuleId] = useState(null);

	if (showAddRuleForm) {
		return (
			<AddRuleForm
				activeService={activeService}
				setShowAddRuleForm={setShowAddRuleForm}
				setViewAndEditRuleId={setViewAndEditRuleId}
			/>
		);
	}

	if (viewAndEditRuleId !== null) {
		return (
			<EditRuleForm
				activeService={activeService}
				activeList={activeList}
				setShowAddRuleForm={setShowAddRuleForm}
				viewAndEditRuleId={viewAndEditRuleId}
				setViewAndEditRuleId={setViewAndEditRuleId}
			/>
		);
	}
	return (
		<>
			<div className={styles.head}>
				<Tabs
					themeType="primary"
					activeTab={activeService}
					onChange={(val) => {
						setActiveService(val);
					}}
				>
					{SERVICE_TABS_MAPPING.map((item) => {
						const { label = '', value = '' } = item;
						return (
							<TabPanel
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
				setViewAndEditRuleId={setViewAndEditRuleId}
				setShowAddRuleForm={setShowAddRuleForm}
			/>
		</>
	);
}

export default RuleSettingTab;
