import React from 'react';

import styles from './styles.module.css';

interface ObjectInterface {
	name: String,
	value:String
}

interface TabInterface {
	options: Array<ObjectInterface>;
	value: String,
	setValue: React.SetStateAction<any>
}

function TabSelect({ options, value, setValue } :TabInterface) {
	return (
		<div className={styles.container}>
			{(options || []).map((item) => (
				<div
					className={value === item.value ? styles.focusedTab : styles.tab}
					onClick={() => setValue(item.value)}
				>
					{item.name}
				</div>
			))}
		</div>
	);
}

export default TabSelect;
