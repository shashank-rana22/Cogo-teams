import useEmployeeDetails from './hooks/useEmployeedetails';

function Employees() {
	const { search, setSearch } = useEmployeeDetails();
	return (
		<div>
			Employees
		</div>
	);
}

export default Employees;
