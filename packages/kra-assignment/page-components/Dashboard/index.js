import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AccordianDisplay from './components/AccordianDisplay';
import FiltersDisplay from './components/FilterDisplay';
import KRATable from './components/KRATable';
import TableDisplay from './components/TablesDisplay';
import styles from './styles.module.css';
import useGetEmployeesWithLowWeightage from './useGetEmployeesWithLowWeightage';
import useGetUnassignedEmployee from './useGetUnassignedEmployees';

const REDIRECT_URL = '/kra-assignment/create';

function Dashboard() {
	const router = useRouter();

	const {
		data:UnassignedData = [],
		loading, filters, setFilters,
	} = useGetUnassignedEmployee();
	const { list:UnassignedList = [] } = UnassignedData;

	const {
		data:LowWeightageEmployeeData = [],
		loading:LoadingLowWeightageEmployee,
	} = useGetEmployeesWithLowWeightage();
	const { list:LowWeightageEmployeeList = [] } = LowWeightageEmployeeData;

	const onClickConfiguration = () => {
		router.push(REDIRECT_URL, REDIRECT_URL);
	};

	const ARRAY_OF_UNASSIGNED_IDS = UnassignedList?.map((obj) => obj.id);
	const [selectArrayUnassignedEmployee, setSelectArrayUnassignedEmployee] = useState([]);

	const ARRAY_OF_LOW_WEIGHTAGE_IDS = LowWeightageEmployeeList?.map((obj) => obj.id);
	const [selectArrayLowWeightEmployee, setSelectArrayLowWeightEmployee] = useState([]);

	// console.log('data', selectArrayLowWeightEmployee);

	return (
		<div>
			<div className={styles.header}>
				<h2>KRA Mapping</h2>
				<div>
					<Button onClick={onClickConfiguration}>ADD KRA</Button>
				</div>
			</div>

			<div className={styles.redirect}>
				<div>
					Please, select the KRAs from the KRA drop-down and click on Add KRA.
				</div>
				<Button themeType="secondary">Back to Employee Filters</Button>
			</div>

			<div className={styles.section}>
				<div className={styles.section_left}>
					<div>
						<FiltersDisplay setFilters={setFilters} />
					</div>

					<div className={styles.table_display}>
						<TableDisplay
							data={UnassignedList}
							loading={loading}
							ARRAY_OF_IDS={ARRAY_OF_UNASSIGNED_IDS}
							selectArray={selectArrayUnassignedEmployee}
							setSelectArray={setSelectArrayUnassignedEmployee}
						/>
					</div>

					<div className={styles.table_display}>
						<TableDisplay
							data={LowWeightageEmployeeList}
							loading={LoadingLowWeightageEmployee}
							ARRAY_OF_IDS={ARRAY_OF_LOW_WEIGHTAGE_IDS}
							selectArray={selectArrayLowWeightEmployee}
							setSelectArray={setSelectArrayLowWeightEmployee}
						/>
					</div>

					<div>
						<AccordianDisplay data={UnassignedData} loading={loading} />
						{/* mapping */}
					</div>
				</div>

				<div className={styles.section_right}>
					<KRATable selectArray={selectArrayUnassignedEmployee} />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
