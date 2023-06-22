import { isEmpty } from '@cogoport/utils';

import KRAWeightCalculationTable from './KRAWeightCalculationTable';
import SelectKRAs from './SelectKRAs';
import useKRAList from './useKRAList';

const ARRAY_LENGTH_CONST = 1;

function KRATable({
	selectArray,
	selectAccordian,
	appliedFilters,
	getEmployeesWithLowWeightage,
	getkrasAssigned,
	getUnassignedEmployee,
	setShowKRACalculationTable,
	filtersFields,
}) {
	const fieldsFilterLastElement = filtersFields?.single_item[filtersFields.single_item.length - ARRAY_LENGTH_CONST]
	|| [];
	const filters = isEmpty(filtersFields) ? appliedFilters : fieldsFilterLastElement;

	const {
		selectedValue,
		setSelectedValue,
		KRAOptions,
		inputValue,
		setInputValue,
		onClickAddKRAs,
	} = useKRAList({ filters, selectAccordian });

	return (
		<div>
			<SelectKRAs
				selectedValue={selectedValue}
				setSelectedValue={setSelectedValue}
				KRAOptions={KRAOptions}
				onClickAddKRAs={onClickAddKRAs}
			/>

			<KRAWeightCalculationTable
				inputValue={inputValue}
				setInputValue={setInputValue}
				selectArray={selectArray}
				getkrasAssigned={getkrasAssigned}
				getUnassignedEmployee={getUnassignedEmployee}
				getEmployeesWithLowWeightage={getEmployeesWithLowWeightage}
				selectAccordian={selectAccordian}
				setShowKRACalculationTable={setShowKRACalculationTable}
			/>
		</div>
	);
}

export default KRATable;
