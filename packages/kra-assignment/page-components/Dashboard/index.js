import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import countTrueValues from '../config/countTrueValues';

import AccordianDisplay from './components/AccordianDisplay';
import FiltersDisplay from './components/FilterDisplay';
import FilterFieldArray from './components/FilterFieldArray';
import KRATable from './components/KRATable';
import TableDisplay from './components/TablesDisplay';
import styles from './styles.module.css';
import useGetEmployeesWithLowWeightage from './useGetEmployeesWithLowWeightage';
import useGetkrasAssigned from './useGetKrasAssigned';
import useGetUnassignedEmployee from './useGetUnassignedEmployees';

const REDIRECT_URL_CREATE = '/kra-assignment/create';
const REDIRECT_URL_RATING = '/kra-assignment/performance-rating-review';
const DISPLAY_ADD_KRA_BUTTON = 1;

function Dashboard() {
	const router = useRouter();

	const {
		data:unassignedData = [],
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
		data:lowWeightageEmployeeData = [],
		loading:loadingLowWeightageEmployee,
		getEmployeesWithLowWeightage,
	} = useGetEmployeesWithLowWeightage({ filters });

	const {
		data: krasAssignedData,
		loading:loadingKrasAssigned,
		getkrasAssigned,
		selectAccordian,
		setSelectAccordian,
		selectAccordianObject = {},
		setSelectAccordianObject,
	} = useGetkrasAssigned({ filters });

	const { list:unassignedList = [] } = unassignedData;
	const { list:lowWeightageEmployeeList = [] } = lowWeightageEmployeeData;

	const [selectUnassignedEmployeeObject, setSelectUnassignedEmployeeObject] = useState({});
	const [selectLowWeightEmployeeObject, setSelectLowWeightEmployeeObject] = useState({});
	const [dataFrom, setDataFrom] = useState();

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

	const CHECK_IF_ONE_EMPLOYEE_SELECTED = (countTrueValues(selectUnassignedEmployeeObject)
		+ countTrueValues(selectAccordianObject)
		+ countTrueValues(selectLowWeightEmployeeObject)) === DISPLAY_ADD_KRA_BUTTON;

	const CHECK_SINGLE_EMPLOYEE_SELECTED = !isEmpty(filters) && CHECK_IF_ONE_EMPLOYEE_SELECTED;

	const onClickConfiguration = (type) => {
		if (type === 'add') {
			router.push(REDIRECT_URL_CREATE, REDIRECT_URL_CREATE);
		}
		if (type === 'review') {
			router.push(REDIRECT_URL_RATING, REDIRECT_URL_RATING);
		}
	};

	const EMPLOYEE_OBJECT_MAPPING = {
		Unassigned    : selectUnassignedEmployeeObject,
		AccordianData : selectAccordianObject,
		LowWeightage  : selectAccordianObject,
	};

	return (
		<div>
			<div className={styles.header}>
				<h2>KRA Mapping</h2>
				<Button onClick={() => onClickConfiguration('review')}>Go To Performance Rating Review</Button>
				<Button onClick={() => onClickConfiguration('add')}>ADD KRA</Button>
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
							disabled={isEmpty(selectUnassignedEmployeeObject)
								&& isEmpty(selectLowWeightEmployeeObject)
								&& isEmpty(selectAccordianObject)}
						>
							Proceed to Allocate KRAs
						</Button>
					)
				}
			</div>

			<div className={styles.section}>
				<div className={styles.section_left}>
					<FiltersDisplay
						setFilters={setFilters}
						check={CHECK_SINGLE_EMPLOYEE_SELECTED}
						resetObjects={resetObjects}
					/>

					{CHECK_SINGLE_EMPLOYEE_SELECTED
						? (
							<FilterFieldArray
								setFilters={setFiltersFields}
								setShowKRACalculationTable={setShowKRACalculationTable}
							/>
						)
						: null}

					<div className={styles.table_display}>
						<h4>All Unassigned KRA Employee List : </h4>
						<TableDisplay
							data={unassignedList}
							loading={loading}
							OBJECT_OF_IDS={OBJECT_OF_UNASSIGNED_IDS}
							selectObject={selectUnassignedEmployeeObject}
							setSelectObject={setSelectUnassignedEmployeeObject}
							type="Unassigned"
							resetObjects={resetObjects}
							setDataFrom={setDataFrom}
							dataFrom={dataFrom}
						/>
					</div>

					<div className={styles.table_display}>
						<div className={styles.filter}>All Low Weightage KRA Employee List : </div>

						<TableDisplay
							data={lowWeightageEmployeeList}
							loading={loadingLowWeightageEmployee}
							OBJECT_OF_IDS={OBJECT_OF_LOW_WEIGHTAGE_IDS}
							selectObject={selectLowWeightEmployeeObject}
							setSelectObject={setSelectLowWeightEmployeeObject}
							type="LowWeightage"
							resetObjects={resetObjects}
							setDataFrom={setDataFrom}
							dataFrom={dataFrom}
						/>
					</div>

					<div>
						<h4>All KRA List : </h4>
						{ !isEmpty(filters)
							? krasAssignedData?.list?.map((item, index) => (
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
							))
							: <div>Select/Apply Filters to Display List of KRAs</div> }
					</div>
				</div>

				{showKRACalculationTable
				&& (
					<div className={styles.section_right}>
						<KRATable
							selectedObject={EMPLOYEE_OBJECT_MAPPING[dataFrom]}
							appliedFilters={filters}
							getkrasAssigned={getkrasAssigned}
							getUnassignedEmployee={getUnassignedEmployee}
							getEmployeesWithLowWeightage={getEmployeesWithLowWeightage}
							selectAccordian={selectAccordian}
							setShowKRACalculationTable={setShowKRACalculationTable}
							filtersFields={filtersFields}
							dataFrom={dataFrom}
						/>
					</div>
				)}

			</div>
		</div>
	);
}

export default Dashboard;
