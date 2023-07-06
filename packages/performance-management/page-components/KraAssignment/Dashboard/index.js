import { Button, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import countTrueValues from '../config/countTrueValues';

import AccordianDisplay from './components/AccordianDisplay';
import FiltersDisplay from './components/FilterDisplay';
import FilterFieldArray from './components/FilterFieldArray';
import KRATable from './components/KRATable';
import TableDisplay from './components/TablesDisplay';
import useGetEmployeesWithLowWeightage from './hooks/useGetEmployeesWithLowWeightage';
import useGetkrasAssigned from './hooks/useGetKrasAssigned';
import useGetUnassignedEmployee from './hooks/useGetUnassignedEmployees';
import styles from './styles.module.css';

const DISPLAY_ADD_KRA_BUTTON = 1;
const DISPLAY_ALLOCATE_KRA_BUTTON = 1;
const TABLE_TYPE_UNASSIGNED = 'Unassigned';
const TABLE_TYPE_LOW_WEIGHTAGE = 'LowWeightage';

function Dashboard() {
	const {
		data: unassignedData = [],
		loading,
		filters,
		setFilters,
		filtersFields,
		setFiltersFields,
		getUnassignedEmployee,
		showKRACalculationTable,
		setShowKRACalculationTable,
	} = useGetUnassignedEmployee();

	const {
		data: lowWeightageEmployeeData = [],
		loading: loadingLowWeightageEmployee,
		getEmployeesWithLowWeightage,
	} = useGetEmployeesWithLowWeightage({ filters });

	const {
		data: krasAssignedData,
		loading: loadingKrasAssigned,
		selectAccordian,
		setSelectAccordian,
		selectAccordianObject = {},
		setSelectAccordianObject,
	} = useGetkrasAssigned({ filters });

	const { list: unassignedList = [] } = unassignedData;
	const { list: lowWeightageEmployeeList = [] } = lowWeightageEmployeeData;

	const [selectUnassignedEmployeeObject, setSelectUnassignedEmployeeObject] = useState({});
	const [selectLowWeightEmployeeObject, setSelectLowWeightEmployeeObject] = useState({});
	const [dataFrom, setDataFrom] = useState('');

	const resetObjects = () => {
		setSelectLowWeightEmployeeObject();
		setSelectUnassignedEmployeeObject();
		setSelectAccordianObject();
		setShowKRACalculationTable();
	};

	const OBJECT_OF_UNASSIGNED_IDS = unassignedList?.reduce((acc, obj) => {
		acc[obj.id] = true;
		return acc;
	}, {});

	const OBJECT_OF_LOW_WEIGHTAGE_IDS = lowWeightageEmployeeList?.reduce((acc, obj) => {
		acc[obj.id] = true;
		return acc;
	}, {});

	const CHECK_IF_ONE_EMPLOYEE_SELECTED = countTrueValues(selectUnassignedEmployeeObject)
      + countTrueValues(selectAccordianObject)
      + countTrueValues(selectLowWeightEmployeeObject);

	const CHECK_SINGLE_EMPLOYEE_SELECTED = !isEmpty(filters)
	&& (CHECK_IF_ONE_EMPLOYEE_SELECTED === DISPLAY_ADD_KRA_BUTTON);

	const EMPLOYEE_OBJECT_MAPPING = {
		Unassigned    : selectUnassignedEmployeeObject,
		AccordianData : selectAccordianObject,
		LowWeightage  : selectAccordianObject,
	};

	const renderAccordians = () => {
		if (loadingKrasAssigned) {
			return (
				<div>
					<Placeholder height="40px" width="100%" margin="5px" />
					<Placeholder height="40px" width="100%" margin="5px" />
				</div>
			);
		}

		return krasAssignedData?.list?.map((item, index) => (
			<AccordianDisplay
				key={`${JSON.stringify(item)}`}
				data={item}
				index={index}
				loading={loadingKrasAssigned}
				selectAccordian={selectAccordian}
				setSelectAccordian={setSelectAccordian}
				selectAccordianObject={selectAccordianObject}
				setSelectAccordianObject={setSelectAccordianObject}
				resetObjects={resetObjects}
				setDataFrom={setDataFrom}
				dataFrom={dataFrom}
			/>
		));
	};

	return (
		<div>
			<div className={styles.header}>
				KRA Mapping
			</div>

			<div className={styles.redirect}>
				<div>
					Please, select the KRAs from the KRA drop-down and click on Add KRA.
				</div>

				{showKRACalculationTable ? (
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
						disabled={CHECK_IF_ONE_EMPLOYEE_SELECTED < DISPLAY_ALLOCATE_KRA_BUTTON}
					>
						Proceed to Allocate KRAs
					</Button>
				)}
			</div>

			<div className={styles.section}>
				<div className={styles.section_left} style={{ width: showKRACalculationTable ? '70%' : '85%' }}>
					<FiltersDisplay
						setFilters={setFilters}
						check={CHECK_SINGLE_EMPLOYEE_SELECTED}
						resetObjects={resetObjects}
					/>

					{CHECK_SINGLE_EMPLOYEE_SELECTED ? (
						<FilterFieldArray
							setFilters={setFiltersFields}
							setShowKRACalculationTable={setShowKRACalculationTable}
						/>
					) : null}

					<div className={styles.table_display}>
						<h4>All Unassigned KRA Employee List : </h4>

						<TableDisplay
							data={unassignedList}
							loading={loading}
							OBJECT_OF_IDS={OBJECT_OF_UNASSIGNED_IDS}
							selectObject={selectUnassignedEmployeeObject}
							setSelectObject={setSelectUnassignedEmployeeObject}
							type={TABLE_TYPE_UNASSIGNED}
							resetObjects={resetObjects}
							setDataFrom={setDataFrom}
							dataFrom={dataFrom}
						/>
					</div>

					{
						!isEmpty(lowWeightageEmployeeList)
						&& (
							<div className={styles.table_display}>
								<div className={styles.filter}>
									All Low Weightage KRA Employee List :
									{' '}
								</div>

								<TableDisplay
									data={lowWeightageEmployeeList}
									loading={loadingLowWeightageEmployee}
									OBJECT_OF_IDS={OBJECT_OF_LOW_WEIGHTAGE_IDS}
									selectObject={selectLowWeightEmployeeObject}
									setSelectObject={setSelectLowWeightEmployeeObject}
									type={TABLE_TYPE_LOW_WEIGHTAGE}
									resetObjects={resetObjects}
									setDataFrom={setDataFrom}
									dataFrom={dataFrom}
								/>
							</div>
						)
					}

					{
						!isEmpty(krasAssignedData?.list) && (
							<div>
								<h4>All KRA List : </h4>
								{!isEmpty(filters) ? (
									renderAccordians()
								) : (
									<div>Select/Apply Filters to Display List of KRAs</div>
								)}
							</div>
						)
					}

				</div>

				{showKRACalculationTable && (
					<div className={styles.section_right}>
						<KRATable
							selectedObject={EMPLOYEE_OBJECT_MAPPING[dataFrom]}
							appliedFilters={filters}
							getUnassignedEmployee={getUnassignedEmployee}
							getEmployeesWithLowWeightage={getEmployeesWithLowWeightage}
							selectAccordian={selectAccordian}
							filtersFields={filtersFields}
							dataFrom={dataFrom}
							resetObjects={resetObjects}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
