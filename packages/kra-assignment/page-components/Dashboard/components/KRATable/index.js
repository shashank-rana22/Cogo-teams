import KRAWeightCalculationTable from './KRAWeightCalculationTable';
import SelectKRAs from './SelectKRAs';
import useKRAList from './useKRAList';

function KRATable({ selectArray, filters, getEmployeesWithLowWeightage, getkrasAssigned, getUnassignedEmployee }) {
	const {
		selectedValue,
		setSelectedValue,
		KRAOptions,
		inputValue,
		setInputValue,
		onClickAddKRAs,
	} = useKRAList({ filters });

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
			/>
		</div>
	);
}

export default KRATable;
