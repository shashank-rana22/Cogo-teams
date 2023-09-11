import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import Documents from './Documents';
import EducationDetails from './EducationDetails';
import EmploymentDetails from './EmploymentDetails/index';
import OtherDetails from './OtherDetails';
import PersonalDetails from './PersonalDetails/index';
import SalaryDetails from './SalaryDetails';
import StatutoryDetails from './StatutoryDetails';
import styles from './styles.module.css';

function TabsPanel({ data = {} }) {
	const [activeTab, setActiveTab] = useState('personal_details');

	const tabsMapping = [
		{
			name      : 'personal_details',
			title     : 'Personal Details',
			Component : () => (<PersonalDetails data={data} />),
		},
		{
			name      : 'education_and_skills',
			title     : 'Education & Skills',
			Component : () => (<EducationDetails data={data} />),
		},
		{
			name      : 'employment_details',
			title     : 'Employment Details',
			Component : () => (<EmploymentDetails data={data} />),
		},
		{
			name      : 'statutory_details',
			title     : 'Statutory Details',
			Component : () => (<StatutoryDetails data={data} />),
		},
		{
			name      : 'salary_details',
			title     : 'Salary Details',
			Component : () => (<SalaryDetails data={data} />),
		},
		{
			name      : 'documents',
			title     : 'Documents',
			Component : () => (<Documents data={data} />),
		},
		{
			name      : 'other_details',
			title     : 'Other Details',
			Component : () => (<OtherDetails data={data} />),
		},
	];

	return (
		<div className={styles.main_container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					fullWidth
					onChange={setActiveTab}
				>
					{
						tabsMapping.map(({ name, title, Component }) => (
							<TabPanel name={name} title={title} key={name}>
								<Component />
							</TabPanel>
						))
					}
				</Tabs>
			</div>
		</div>
	);
}

export default TabsPanel;
