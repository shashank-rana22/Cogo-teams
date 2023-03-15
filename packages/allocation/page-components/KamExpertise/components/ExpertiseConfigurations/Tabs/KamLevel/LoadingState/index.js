import { Collapse } from '@cogoport/components';
import React, { useState } from 'react';

import LoaderCard from './LoaderCard';
import styles from './styles.module.css';

function LoadingState() {
	const options = [1, 2, 3].map(() => ({
		title: <LoaderCard />,

	}));
	const [value, onChange] = useState('');

	return (
		<Collapse
			panel={options}
			activeKey={value}
			setActive={onChange}
			type="text"
			className={styles.collapse}
		/>
	);
}

export default LoadingState;
