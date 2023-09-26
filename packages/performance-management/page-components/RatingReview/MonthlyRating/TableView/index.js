import { Input, Select, Table, Button, Pagination } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppSearch, IcMArrowRotateRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getColumns from './getColumns';
import styles from './styles.module.css';
import useTableView from './useTableView';

const india_country_id = GLOBAL_CONSTANTS.country_ids.IN;
const vietnam_country_id = GLOBAL_CONSTANTS.country_ids.VN;

const india_constants = getCountryConstants({ country_id: india_country_id });
const vietnam_constants = getCountryConstants({ country_id: vietnam_country_id });

const OFFICE_LOCATIONS = [...india_constants.office_locations, ...vietnam_constants.office_locations];

const REPORTING_CITY_OPTIONS = OFFICE_LOCATIONS.map((location) => (
	{ label: startCase(location), value: location }));

function TableView({
	list = [],
	loading = false,
	paginationData = {},
	page = 1,
	setPage = () => {},
	search = '',
	setSearch = () => {},
	location = '',
	setLocation = () => {},
	department = '',
	setDepartment = () => {},
}) {
	const {
		rating,
		setRating,
		feedback,
		setFeedback,
	} = useTableView();

	const columns = getColumns({
		rating,
		setRating,
		feedback,
		setFeedback,
	});

	const { page_limit, total_count } = paginationData || {};

	if (!loading && isEmpty(list)) return null;

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
						isClearable
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
				<Table columns={columns} data={list} loading={loading} />

				{total_count > page_limit ? (
					<div style={{ display: 'flex' }}>
						<Pagination
							type="number"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={setPage}
						/>
					</div>
				) : null}
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
