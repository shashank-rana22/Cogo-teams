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

	return (
		<div className={styles.main_container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					fullWidth
					onChange={setActiveTab}
				>
					<TabPanel name="personal_details" title="Personal Details">
						<PersonalDetails data={data} />
					</TabPanel>
					<TabPanel name="education_and_skills" title="Education & Skills">
						<EducationDetails data={data} />
					</TabPanel>
					<TabPanel name="employment_details" title="Employment Details">
						<EmploymentDetails data={data} />
					</TabPanel>
					<TabPanel name="statutory_details" title="Statutory Details">
						<StatutoryDetails data={data} />
					</TabPanel>
					<TabPanel name="salary_details" title="Salary Details">
						<SalaryDetails data={data} />
					</TabPanel>
					<TabPanel name="documents" title="Documents">
						<Documents data={data} />
					</TabPanel>
					<TabPanel name="other_details" title="Other Details">
						<OtherDetails data={data} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default TabsPanel;
