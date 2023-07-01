import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const renderLoading = ({ loadingCount = 0, height = '100px', itemHeight = '0px' }) => (
	[...Array(loadingCount)].map(() => (
		<div className={styles.loading_item} style={{ height: `${height}` }}>
			<Placeholder height={itemHeight} width="16%" />
			<Placeholder height={itemHeight} width="16%" />
			<Placeholder height={itemHeight} width="16%" />
			<Placeholder height={itemHeight} width="16%" />
			<Placeholder height={itemHeight} width="16%" />
		</div>
	))
);

function LoadingState({ activeTab = 'active' }) {
	return (
		<div className={styles.loading_container}>
			{activeTab === 'active'
				? renderLoading({ loadingCount: 5, height: '90px', itemHeight: '32px' })
				: renderLoading({ loadingCount: 6, height: '80px', itemHeight: '28px' })}
		</div>
	);
}

export default LoadingState;
