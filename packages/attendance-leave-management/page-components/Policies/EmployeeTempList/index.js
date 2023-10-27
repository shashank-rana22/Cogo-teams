import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import useGetListGeoLocationReq from '../../../hooks/useGetListGeoLocationReq';

import EmployeeTempTable from './EmployeeTempTable';
import styles from './styles.module.css';

const geolocation = [{
	name                 : 'Hrishikesh  Kulkarni',
	cogoport_email       : 'hk@cogoport.com',
	employee_code        : 'COGO-0563',
	status               : 'approved',
	remarks              : '',
	created_at           : '2023-10-26T15:33:13.247Z',
	updated_at           : '2023-10-26T15:33:13.247Z',
	permission_from_date : '2023-10-27T15:33:13.000Z',
	permission_to_date   : '2023-10-30T15:33:13.000Z',
	approved_on          : '2023-10-26T15:33:13.235Z',
	approved_by_id       : 'dfca5d91-8906-d146-2970-202eace33a66',
	rejection_reason     : '',
	is_active            : true,

}];

function EmployeeTempList() {
	// const { geoLocationData } = useGetListGeoLocationReq();
	console.log('dataItems::');
	// const [searchQuery, setSearchQuery] = useState('');

	const {
		loading,
		geoLocationData,
		setFilters, filters,
		debounceQuery,
	} = useGetListGeoLocationReq();

	// const handleSearch = (val) => {
	// 	debounceQuery(val);
	// 	setSearchQuery(val);
	// };

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.heading}>Assign Employee</span>
			</div>
			<div className={styles.emplist_header}>
				<span className={styles.emp_heading}>Employee List</span>
				<div className={styles.filters}>
					<Input
						size="md"
						prefix={<IcMSearchlight />}
						placeholder="Search"
						// onChange={(e) => handleSearch(e)}
						// value={searchQuery}
					/>
				</div>
			</div>
			<EmployeeTempTable
				data={geolocation}
				// setFilters={setFilters}
				// loading={loading}
				// filters={filters}
				// searchQuery={searchQuery}
				// selectedLocation={selectedLocation}
				// refetch={refetch}
			/>
		</div>
	);
}

export default EmployeeTempList;
