import Employee from './Employee';

function EmployeeList({ data = {}, currency, filters }) {
	return (
		<div>
			{data.name?.toLowerCase() !== 'others' && (
				<Employee
					val={{
						name       : 'Self',
						manager_id : data.manager_id,
						...data.my_stats,
					}}
					currency={currency}
					filters={filters}
				/>
			)}
			{data?.employees?.map((val) => (
				<Employee val={val} currency={currency} filters={filters} />
			))}
		</div>
	);
}

export default EmployeeList;
