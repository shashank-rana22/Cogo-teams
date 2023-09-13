import { Checkbox } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function FilterDropDownContent(props) {
	const { list, events, value } = props;
	const handleChange = (item) => {
		events(item, value);
	};
	return (
		<div className={styles.container}>
			<ul style={{ padding: '0 10px 0 10px' }}>
				{list?.map((item) => (
					<div key={item.id} className={styles.item}>
						<Checkbox checked={item.status} onChange={() => handleChange(item)} />
						<div>{item.name}</div>
					</div>
				))}
			</ul>
		</div>
	);
}

export default FilterDropDownContent;
