import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Filters() {
	const [value, setValue] = useState();

	const handleSearchValue = (values) => {
		console.log(values, 'input search');
	};

	return (
		<div className={styles.container}>
			<Input
				size="md"
				placeholder="Search for Student name"
				value={value}
				onChange={handleSearchValue}
				suffix={(
					<div className={styles.icon_container}>
						<IcMSearchlight />
					</div>
				)}
			/>
		</div>
	);
}

export default Filters;
