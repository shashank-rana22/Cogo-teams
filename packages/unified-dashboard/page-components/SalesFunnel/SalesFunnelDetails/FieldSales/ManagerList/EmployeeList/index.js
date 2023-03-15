import Employee from './Employee';

function EmployeeList({ data = {}, currency, filters }) {
	return (
		<>
			{data.user_name?.toLowerCase() !== 'others' && (
				<Employee
					val={{
						user_name  : 'Self',
						manager_id : data.manager_id,
						...data.self,
					}}
					currency={currency}
					filters={filters}
				/>
			)}
			{data?.employees?.map((val) => (
				<Employee val={val} currency={currency} filters={filters} />
			))}
		</>
	);
}

export default EmployeeList;
