import { isEmpty } from '@cogoport/utils';

import KRAWeightCalculationTable from './KRAWeightCalculationTable';
import SelectKRAs from './SelectKRAs';
import useKRAList from './useKRAList';

const ARRAY_LENGTH = 1;

function KRATable({
	selectedObject,
	selectAccordian,
	appliedFilters,
	getEmployeesWithLowWeightage,
	getUnassignedEmployee,
	filtersFields,
	dataFrom,
	resetObjects,
	getkrasAssigned,
}) {
	const fieldsFilterLastElement = filtersFields?.single_item?.
		[(filtersFields.single_item || []).length - ARRAY_LENGTH]
	|| [];

	const filters = isEmpty(filtersFields) ? appliedFilters : fieldsFilterLastElement;

	const {
		selectedValue,
		setSelectedValue,
		kraOptions,
		inputValue,
		setInputValue,
		onClickAddKRAs,
	} = useKRAList({ filters, selectAccordian, dataFrom });

	const selectArray = Object.keys(selectedObject).filter((key) => selectedObject[key] === true);

	return (
		<div>
			<SelectKRAs
				selectedValue={selectedValue}
				setSelectedValue={setSelectedValue}
				kraOptions={kraOptions}
				onClickAddKRAs={onClickAddKRAs}
			/>

			<KRAWeightCalculationTable
				inputValue={inputValue}
				setInputValue={setInputValue}
				selectArray={selectArray}
				getUnassignedEmployee={getUnassignedEmployee}
				getEmployeesWithLowWeightage={getEmployeesWithLowWeightage}
				resetObjects={resetObjects}
				getkrasAssigned={getkrasAssigned}
			/>
		</div>
	);
}

export default KRATable;
