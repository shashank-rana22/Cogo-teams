import KRAWeightCalculationTable from './KRAWeightCalculationTable';
import SelectKRAs from './SelectKRAs';
import useKRAList from './useKRAList';

function KRATable({
	selectArray,
	selectAccordian,
	filters,
	getEmployeesWithLowWeightage,
	getkrasAssigned,
	getUnassignedEmployee,
	setShowKRACalculationTable,
}) {
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
				selectAccordian={selectAccordian}
				setShowKRACalculationTable={setShowKRACalculationTable}
			/>
		</div>
	);
}

export default KRATable;
