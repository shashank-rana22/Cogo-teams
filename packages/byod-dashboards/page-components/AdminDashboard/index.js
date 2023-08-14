import { Input, Button, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useCreateGroupDetails from '../../hooks/useCreateGroupDetails';
import useGetEmployeeReimbursementGroup from '../../hooks/useGetEmployeeReimbursementGroup';

import styles from './styles.module.css';

const country_options = [
	{ value: 'india', label: 'India' },
	{ value: 'vietnam', label: 'Vietnam' },
];
function AdminDashboard() {
	const [countryValue, setCountryValue] = useState('India');
	const [employeeName, setEmployeeName] = useState('');
	const [configurationName, setConfigurationName] = useState('');

	const { getEmployeeReimbursementGroup } = useGetEmployeeReimbursementGroup();

	const { createConfigurationGroup, btnloading } = 	useCreateGroupDetails({
		configurationName,
		getEmployeeReimbursementGroup,
	});
	return (
		<div className={styles.main_container}>
			<div className={styles.header_container}>
				<div className={styles.main_title}>
					Admin Dashboard
				</div>

				<div className={styles.configuration_container}>
					<Input
						style={{ width: '250px' }}
						prefix={<IcMSearchlight />}
						placeholder="Search employees"
						onChange={(e) => setEmployeeName(e)}
					/>
					<Input
						style={{ width: '250px', marginLeft: '10px' }}
						placeholder="Enter Configuration Name"
						onChange={(e) => setConfigurationName(e)}
					/>

					<Button
						size="md"
						style={{ marginLeft: '20px', width: '120px', marginTop: '4px' }}
						loading={btnloading}
						onClick={() => {
							createConfigurationGroup();
						}}
					>
						Configuration
					</Button>

					<Select
						style={{ marginLeft: '20px', width: '200px' }}
						value={countryValue}
						options={country_options}
						onChange={setCountryValue}
						placeholder="select Country"
					/>
				</div>
			</div>

		</div>
	);
}

export default AdminDashboard;
