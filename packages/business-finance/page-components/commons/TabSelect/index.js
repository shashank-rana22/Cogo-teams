import React from 'react';

import styles from './styles.module.css';

function TabSelect({ options, value, setValue }) {
	return (
		<div className={styles.container}>
			{(options || []).map((item) => (
				<div
					className={value === item.value ? styles.focused_tab : styles.tab}
					onClick={() => setValue(item.value)}
					role="presentation"
				>
					{item.name}
				</div>
			))}
		</div>
	);
}

export default TabSelect;
