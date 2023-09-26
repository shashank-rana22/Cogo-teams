import { Input, Select, Table, Button } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppSearch, IcMArrowRotateRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getColumns from './getColumns';
import styles from './styles.module.css';

const india_country_id = GLOBAL_CONSTANTS.country_ids.IN;
const vietnam_country_id = GLOBAL_CONSTANTS.country_ids.VN;

const india_constants = getCountryConstants({ country_id: india_country_id });
const vietnam_constants = getCountryConstants({ country_id: vietnam_country_id });

const OFFICE_LOCATIONS = [...india_constants.office_locations, ...vietnam_constants.office_locations];

const REPORTING_CITY_OPTIONS = OFFICE_LOCATIONS.map((location) => (
	{ label: startCase(location), value: location }));

function TableView() {
	const [department, setDepartment] = useState('');
	const [location, setLocation] = useState('');
	const [search, setSearch] = useState('');

	const columns = getColumns();

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<div className={styles.employee_filters}>
					<AsyncSelect
						placeholder="Department"
						value={department}
						onChange={setDepartment}
						isClearable
						initialCall
						asyncKey="list_employee_departments"
						style={{ width: 200 }}
					/>

					<Select
						options={REPORTING_CITY_OPTIONS}
						value={location}
						size="sm"
						onChange={setLocation}
						style={{ width: 200 }}
						placeholder="Location"
					/>
				</div>

				<Input
					value={search}
					onChange={setSearch}
					placeholder="Search"
					prefix={<IcMAppSearch />}
					style={{ width: 300 }}
				/>
			</div>

			<div className={styles.table_container}>
				<Table columns={columns} data={[{}]} loading={false} />
			</div>

			<div className={styles.bottom_banner}>
				<div className={styles.banner_text}>
					12 Employees have not been rated
					<div className={styles.link_text}>Show unrated employees</div>
				</div>

				<Button>
					Send Ratings
					<IcMArrowRotateRight
						height="16px"
						width="16px"
						style={{ marginLeft: 4 }}
					/>
				</Button>
			</div>
		</div>
	);
}

export default TableView;
