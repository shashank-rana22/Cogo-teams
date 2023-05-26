import { useState } from 'react';

import DefaultersFilters from './DefaultersFilters';

function Defaulters() {
	const [globalFilters, setGlobalFilters] = useState({});
	const [isCustomerView, setIsCustomerView] = useState(false);

	return (
		<div>
			<DefaultersFilters
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				isCustomerView={isCustomerView}
			/>
		</div>
	);
}

export default Defaulters;
