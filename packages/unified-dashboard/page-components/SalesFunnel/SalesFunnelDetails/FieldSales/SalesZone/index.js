import { v4 as uuidv4 } from 'uuid';

import Zone from './Zone';

function SalesZone({ data = [], currency, filters }) {
	return (
		<div>
			{data?.map((val) => (
				<Zone key={uuidv4()} val={val} currency={currency} filters={filters} />
			))}
		</div>
	);
}

export default SalesZone;
