import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import ListView from '../../common/ListView';
import useListFclWeightSlabsConfiguration from '../../hooks/useListFclWeightSlabsConfiguration';

import columnsFunc from './Fields';
import styles from './styles.module.css';

function WeightSlabs() {
	const {
		listWeightSlabs: refetch,
		data,
		loading,
		filters,
		setFilters,
	} = useListFclWeightSlabsConfiguration();
	const [showModal, setShowModal] = useState(false);
	const handleClick = () => {
		setShowModal(!showModal);
	};
	const columns = columnsFunc({
		setShowModal,
		refetch,
	});

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>WeightSlabs</h1>
			<div className={styles.button_container}>
				<Button
					className={styles.button}
					onClick={handleClick}
				>
					Create New Weight Slab
				</Button>
			</div>
			<div className={styles.list_container}>
				<ListView
					data={data}
					columns={columns}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default WeightSlabs;
