import { IcMAscendingSort, IcMDescendingSort } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const SORT_ICON_MAPPING = {
	asc  : <IcMAscendingSort />,
	desc : <IcMAscendingSort className={styles.sort_rotate} />,
};

function SortButton({ type = 'asc', onChange = () => {} }) {
	const handleClick = () => {
		if (type === 'asc') onChange('desc');
		else onChange('asc');
	};

	return (
		<div role="presentation" onClick={handleClick} className={styles.sort_container}>
			<IcMDescendingSort className={styles.sort_icon_base} />
			{SORT_ICON_MAPPING[type]}
		</div>
	);
}

export default SortButton;
