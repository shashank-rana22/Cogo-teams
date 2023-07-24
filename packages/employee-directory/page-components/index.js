import React, { useState } from 'react';

import StyledTable from '../common/StyledTable';
import useGetColumns from '../common/useGetColumns';

import Filters from './Filters';
import Header from './Header';
import styles from './styles.module.css';

const randomDataArray = [
	{
		employee_name     : 'Aanchal Kapoor',
		cogo_id           : 'COGO-0001',
		designation       : 'Product Designer',
		contact_no        : '1234567890',
		email_id          : 'test@test.com',
		chapter           : 'product',
		location          : 'Gurgaon',
		reporting_manager : 'Vinod Talapa',
		status            : 'active',
	},
	{
		employee_name     : 'John Doe',
		cogo_id           : 'COGO-1234',
		designation       : 'Software Engineer',
		contact_no        : '9876543210',
		email_id          : 'john.doe@example.com',
		chapter           : 'development',
		location          : 'New York',
		reporting_manager : 'Alice Johnson',
		status            : 'active',
	},
	{
		employee_name     : 'Jane Smith',
		cogo_id           : 'COGO-5678',
		designation       : 'Marketing Manager',
		contact_no        : '1234509876',
		email_id          : 'jane.smith@example.com',
		chapter           : 'marketing',
		location          : 'London',
		reporting_manager : 'Michael Brown',
		status            : 'active',
	},
	{
		employee_name     : 'Robert Johnson',
		cogo_id           : 'COGO-9123',
		designation       : 'HR Specialist',
		contact_no        : '9876123450',
		email_id          : 'robert.johnson@example.com',
		chapter           : 'human_resources',
		location          : 'Berlin',
		reporting_manager : 'Emma Davis',
		status            : 'active',
	},
	{
		employee_name     : 'Emily Williams',
		cogo_id           : 'COGO-4567',
		designation       : 'Data Analyst',
		contact_no        : '7890654321',
		email_id          : 'emily.williams@example.com',
		chapter           : 'analytics',
		location          : 'San Francisco',
		reporting_manager : 'David Lee',
		status            : 'active',
	},
	{
		employee_name     : 'Michael Anderson',
		cogo_id           : 'COGO-8912',
		designation       : 'Finance Manager',
		contact_no        : '9012345678',
		email_id          : 'michael.anderson@example.com',
		chapter           : 'finance',
		location          : 'Singapore',
		reporting_manager : 'Sophia Wilson',
		status            : 'active',
	},
	{
		employee_name     : 'Olivia Martinez',
		cogo_id           : 'COGO-3456',
		designation       : 'Product Manager',
		contact_no        : '5678901234',
		email_id          : 'olivia.martinez@example.com',
		chapter           : 'product',
		location          : 'Tokyo',
		reporting_manager : 'William Garcia',
		status            : 'active',
	},
	{
		employee_name     : 'James Robinson',
		cogo_id           : 'COGO-7890',
		designation       : 'Sales Representative',
		contact_no        : '3456789012',
		email_id          : 'james.robinson@example.com',
		chapter           : 'sales',
		location          : 'Sydney',
		reporting_manager : 'Ava Taylor',
		status            : 'active',
	},
	{
		employee_name     : 'Sophia Harris',
		cogo_id           : 'COGO-2345',
		designation       : 'Quality Assurance Specialist',
		contact_no        : '8901234567',
		email_id          : 'sophia.harris@example.com',
		chapter           : 'quality_assurance',
		location          : 'Toronto',
		reporting_manager : 'Ethan Phillips',
		status            : 'active',
	},
	{
		employee_name     : 'Noah King',
		cogo_id           : 'COGO-6789',
		designation       : 'Graphic Designer',
		contact_no        : '2345678901',
		email_id          : 'noah.king@example.com',
		chapter           : 'design',
		location          : 'Paris',
		reporting_manager : 'Isabella Lewis',
		status            : 'active',
	},
];

function EmployeeDirectory() {
	const [activeTab, setActiveTab] = useState('regular');
	const columns = useGetColumns();
	return (
		<>
			<h3 className={styles.heading}>Employee Directory</h3>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />
			<Filters />
			<StyledTable columns={columns} data={randomDataArray} />
		</>
	);
}

export default EmployeeDirectory;
