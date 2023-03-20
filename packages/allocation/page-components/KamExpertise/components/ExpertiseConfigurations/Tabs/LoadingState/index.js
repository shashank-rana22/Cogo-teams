import { Collapse } from '@cogoport/components';
import React, { useState } from 'react';

import LoaderCard from './LoaderCard';
import styles from './styles.module.css';

function LoadingState({ columnsToLoad }) {
	const options = [1, 2, 3].map(() => ({
		title: <LoaderCard columnsToLoad={columnsToLoad} />,

	}));
	const [value, onChange] = useState('');

	return (
		<Collapse
			panels={options}
			activeKey={value}
			setActive={onChange}
			type="text"
			className={styles.collapse}
		/>
	);
}

export default LoadingState;
