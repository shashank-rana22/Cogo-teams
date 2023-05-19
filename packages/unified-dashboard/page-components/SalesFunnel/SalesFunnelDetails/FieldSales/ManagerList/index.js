import { v4 as uuidv4 } from 'uuid';

import Manager from './Manager';

function ManagerList({ data = [], currency, filters, managerPad = 10 }) {
	return (
		<div>
			{data?.map((val) => (
				<Manager
					key={uuidv4()}
					val={val}
					currency={currency}
					filters={filters}
					managerPad={managerPad}
				/>
			))}
		</div>
	);
}

export default ManagerList;
