import { Input, Button, Select, Accordion } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateGroupDetails from '../../hooks/useCreateGroupDetails';
import useListEmployeeDeviceReimbursementGroups from '../../hooks/useListEmployeeDeviceReimbursementGroups';

import GroupContent from './GroupContent';
import styles from './styles.module.css';

const country_options = [
	{ value: 'india', label: 'India' },
	{ value: 'vietnam', label: 'Vietnam' },
];

function AdminDashboard() {
	const router = useRouter();
	const [countryValue, setCountryValue] = useState('India');
	const [configurationName, setConfigurationName] = useState('');

	const { data } = useListEmployeeDeviceReimbursementGroups();
	const { list } = data || [];

	const { createConfigurationGroup, btnloading } = useCreateGroupDetails({ configurationName });
	return (
		<div className={styles.main_container}>
			<div className={styles.header_container}>
				<div className={styles.main_title}>
					Admin Dashboard
				</div>

				<div className={styles.configuration_container}>
					<Input
						style={{ width: '250px', marginLeft: '10px' }}
						placeholder="Enter Configuration Name"
						onChange={(e) => setConfigurationName(e)}
					/>

					<Button
						size="md"
						style={{ marginLeft: '20px', width: '120px', marginTop: '4px' }}
						loading={btnloading}
						onClick={createConfigurationGroup}
						disabled={(isEmpty(configurationName))}
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
			{!(isEmpty(list)) ? list?.map((item) => {
				const { addon_details, device_details } = item || [];
				return (
					<div key={item.id} style={{ marginBottom: '20px' }}>
						<Accordion
							type="text"
							title={(
								<div className={styles.accordian_title_container}>
									<div className={styles.title_accordian}>
										<strong>{startCase(item.name)}</strong>
									</div>
									<div className={styles.styled_button}>
										<Button
											themeType="secondary"
											onClick={
											() => router.push(`/byod/admin-dashboard/configuration?id=${item.id}`)
}
										>
											Edit
										</Button>
									</div>
								</div>
							)}
							style={{ width: '100%' }}
						>
							<GroupContent
								addon_details={addon_details}
								device_details={device_details}
								id={item.id}
							/>
						</Accordion>
					</div>
				);
			}) : null}

		</div>
	);
}

export default AdminDashboard;
