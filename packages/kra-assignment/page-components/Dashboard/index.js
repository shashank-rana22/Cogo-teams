import { Button, Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../common/EmptyState';
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
const TABLE_TYPE_UNASSIGNED = 'Unassigned';
const TABLE_TYPE_LOW_WEIGHTAGE = 'LowWeightage';
const BUTTON_FUNCTION_ADD = 'add';
const BUTTON_FUNCTION_REVIEW = 'review';
const EMPTY_KRA_TEXT = 'No KRAs to Show';

function Dashboard() {
	const router = useRouter();

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

	const OBJECT_OF_LOW_WEIGHTAGE_IDS = lowWeightageEmployeeList?.reduce(
		(acc, obj) => {
			acc[obj.id] = true;
			return acc;
		},
		{},
	);

	const CHECK_IF_ONE_EMPLOYEE_SELECTED = countTrueValues(selectUnassignedEmployeeObject)
      + countTrueValues(selectAccordianObject)
      + countTrueValues(selectLowWeightEmployeeObject)
    === DISPLAY_ADD_KRA_BUTTON;

	const CHECK_SINGLE_EMPLOYEE_SELECTED = !isEmpty(filters) && CHECK_IF_ONE_EMPLOYEE_SELECTED;

	const onClickConfiguration = (type) => {
		if (type === BUTTON_FUNCTION_ADD) {
			router.push(REDIRECT_URL_CREATE, REDIRECT_URL_CREATE);
		}
		if (type === BUTTON_FUNCTION_REVIEW) {
			router.push(REDIRECT_URL_RATING, REDIRECT_URL_RATING);
		}
	};

	const EMPLOYEE_OBJECT_MAPPING = {
		Unassigned    : selectUnassignedEmployeeObject,
		AccordianData : selectAccordianObject,
		LowWeightage  : selectAccordianObject,
	};

	const renderAccordians = () => {
		if (loadingKrasAssigned) {
			return (
				<>
					<Placeholder height="40px" width="100%" margin="5px" />
					<Placeholder height="40px" width="100%" margin="5px" />
				</>
			);
		}

		if (isEmpty(krasAssignedData?.list) && !loadingKrasAssigned) {
			return (
				<div style={{ paddingTop: 6, paddingLeft: 6 }}>
					<EmptyState emptyText={EMPTY_KRA_TEXT} />
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
				<h2>KRA Mapping</h2>
				<Button onClick={() => onClickConfiguration(BUTTON_FUNCTION_REVIEW)}>
					Go To Performance Rating Review
				</Button>

				<Button onClick={() => onClickConfiguration(BUTTON_FUNCTION_ADD)}>
					ADD KRA
				</Button>
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
						disabled={
							isEmpty(selectUnassignedEmployeeObject)
							&& isEmpty(selectLowWeightEmployeeObject)
							&& isEmpty(selectAccordianObject)
						}
					>
						Proceed to Allocate KRAs
					</Button>
				)}
			</div>

			<div className={styles.section}>
				<div className={styles.section_left}>
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

					<div>
						<h4>All KRA List : </h4>
						{!isEmpty(filters) ? (
							renderAccordians()
						) : (
							<div>Select/Apply Filters to Display List of KRAs</div>
						)}
					</div>
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
