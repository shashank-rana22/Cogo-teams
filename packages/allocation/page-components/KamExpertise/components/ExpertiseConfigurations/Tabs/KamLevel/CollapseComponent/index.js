import { Button, Collapse } from '@cogoport/components';
// import { isEmpty } from '@cogoport/utils';
import React from 'react';

// import EmptyState from '../../../../../../../common/EmptyState';
import LoadingState from '../../LoadingState';
import styles from '../styles.module.css';

import ResponseCard from './ResponseCard';

function CollapseComponent({
	options,
	createKam,
	setActiveCard,
	activeCard,
	setCreateKam,
	dataLength,
	refetch,
	levelLoading,
}) {
	if (levelLoading) {
		return <LoadingState columnsToLoad={4} />;
	}

	// if (isEmpty(options) && createKam) {
	// 	return <EmptyState />;
	// }

	return (
		<>
			<Collapse
				panels={options}
				activeKey={activeCard}
				setActive={setActiveCard}
				type="text"
				className={styles.collapse}
			/>

			{createKam ? (
				<div className={styles.response_card}>
					<ResponseCard
						createKAM={createKam}
						setCreateKam={setCreateKam}
						dataLength={dataLength}
						refetch={refetch}
					/>
				</div>
			) : (
				<div style={{ marginTop: '10px' }}>
					<Button
						themeType="secondary"
						className={styles.create_button}
						onClick={() => setCreateKam(true)}
					>
						Create Kam Level
					</Button>
				</div>
			)}
		</>
	);
}

export default CollapseComponent;
