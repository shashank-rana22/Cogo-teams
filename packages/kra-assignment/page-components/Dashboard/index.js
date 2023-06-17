import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import AccordianDisplay from './components/AccordianDisplay';
import FiltersDisplay from './components/FilterDisplay';
import TableDisplay from './components/TablesDisplay';
import styles from './styles.module.css';
import useGetUnassignedEmployee from './useGetUnassignedEmployees';

const REDIRECT_URL = '/kra-assignment/create';

function Dashboard() {
	const router = useRouter();

	const {
		data,
		loading,
		filters,
		setFilters,
	} = useGetUnassignedEmployee();

	const onClickConfiguration = () => {
		router.push(REDIRECT_URL, REDIRECT_URL);
	};

	return (
		<div>
			<div className={styles.header}>
				<h2>KRA Mapping</h2>
				<div>
					<Button onClick={onClickConfiguration}>ADD KRA</Button>
				</div>
			</div>

			<div className={styles.redirect}>
				<div>Please, select the KRAs from the KRA drop-down and click on Add KRA.</div>
				<Button themeType="secondary">Back to Employee Filters</Button>
			</div>

			<div className={styles.section}>
				<div className={styles.section_left}>
					<div>
						<FiltersDisplay
							filters={filters}
							setFilters={setFilters}
						/>
					</div>

					<div className={styles.table_display}>
						<TableDisplay data={data} loading={loading} />
					</div>

					<div>
						<AccordianDisplay data={data} loading={loading} />
					</div>
				</div>

				<div className={styles.section_right}>
					sadfg
				</div>

			</div>

		</div>
	);
}

export default Dashboard;
