import { v4 as uuidv4 } from 'uuid';

import Employee from './Employee';

function EmployeeList({ data = {}, currency, filters }) {
	return (
		<>
			{data.user_name?.toLowerCase() !== 'others' && (
				<Employee
					val={{
						user_name : 'Self',
						agent_id  : data.agent_id,
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
