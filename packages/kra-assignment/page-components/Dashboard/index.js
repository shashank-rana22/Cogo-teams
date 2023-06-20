import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AccordianDisplay from './components/AccordianDisplay';
import FiltersDisplay from './components/FilterDisplay';
import KRATable from './components/KRATable';
import TableDisplay from './components/TablesDisplay';
import styles from './styles.module.css';
import useGetEmployeesWithLowWeightage from './useGetEmployeesWithLowWeightage';
import useGetkrasAssigned from './useGetKrasAssigned';
import useGetUnassignedEmployee from './useGetUnassignedEmployees';

const REDIRECT_URL = '/kra-assignment/create';

function Dashboard() {
	const router = useRouter();
	const [showKRACalculationTable, setShowKRACalculationTable] = useState(false);

	const {
		data:UnassignedData = [],
		loading, filters, setFilters,
		getUnassignedEmployee,
	} = useGetUnassignedEmployee();

	const { list:UnassignedList = [] } = UnassignedData;

	const {
		data:LowWeightageEmployeeData = [],
		loading:LoadingLowWeightageEmployee,
		getEmployeesWithLowWeightage,
	} = useGetEmployeesWithLowWeightage();

	const { list:LowWeightageEmployeeList = [] } = LowWeightageEmployeeData;

	const {
		data: KrasAssignedData,
		loading:LoadingKrasAssigned,
		getkrasAssigned,
	} = useGetkrasAssigned();

	const onClickConfiguration = () => {
		router.push(REDIRECT_URL, REDIRECT_URL);
	};

	const ARRAY_OF_UNASSIGNED_IDS = UnassignedList?.map((obj) => obj.id);
	const [selectArrayUnassignedEmployee, setSelectArrayUnassignedEmployee] = useState([]);

	const ARRAY_OF_LOW_WEIGHTAGE_IDS = LowWeightageEmployeeList?.map((obj) => obj.id);
	const [selectArrayLowWeightEmployee, setSelectArrayLowWeightEmployee] = useState([]);

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

				{
					showKRACalculationTable ? (
						<Button
							themeType="secondary"
							onClick={() => setShowKRACalculationTable(false)}
						>
							Back to Employee Filters
						</Button>
					) : (
						<Button
							size="md"
							onClick={() => setShowKRACalculationTable(true)}
						>
							Proceed to Allocate KRAs
						</Button>
					)
				}

			</div>

			<div className={styles.section}>
				<div className={styles.section_left}>

					<FiltersDisplay setFilters={setFilters} />

					<div className={styles.table_display}>
						<h4>All Unassigned KRA Employee List : </h4>
						<TableDisplay
							data={UnassignedList}
							loading={loading}
							ARRAY_OF_IDS={ARRAY_OF_UNASSIGNED_IDS}
							selectArray={selectArrayUnassignedEmployee}
							setSelectArray={setSelectArrayUnassignedEmployee}
						/>
					</div>

					<div className={styles.table_display}>
						<h4>All Low Weightage KRA Employee List : </h4>
						<TableDisplay
							data={LowWeightageEmployeeList}
							loading={LoadingLowWeightageEmployee}
							ARRAY_OF_IDS={ARRAY_OF_LOW_WEIGHTAGE_IDS}
							selectArray={selectArrayLowWeightEmployee}
							setSelectArray={setSelectArrayLowWeightEmployee}
						/>
					</div>

					<div>
						<h4>All KRA List : </h4>
						{KrasAssignedData?.list?.map((item) => (
							<AccordianDisplay data={item} loading={LoadingKrasAssigned} key={item?.id} />
						)) }
					</div>
				</div>

				{showKRACalculationTable
				&& (
					<div className={styles.section_right}>
						<KRATable
							selectArray={selectArrayUnassignedEmployee}
							filters={filters}
							getkrasAssigned={getkrasAssigned}
							getUnassignedEmployee={getUnassignedEmployee}
							getEmployeesWithLowWeightage={getEmployeesWithLowWeightage}
						/>
					</div>
				)}

			</div>
		</div>
	);
}

export default Dashboard;
