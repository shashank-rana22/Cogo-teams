import Employee from './Employee';
import { v4 as uuidv4 } from 'uuid';

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
				<Employee key={uuidv4()} val={val} currency={currency} filters={filters} />
			))}
		</>
	);
}

export default EmployeeList;
