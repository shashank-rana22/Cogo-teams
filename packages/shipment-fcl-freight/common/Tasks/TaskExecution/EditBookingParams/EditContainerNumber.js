import { MultiSelect } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const DETAILS_KEYS = ['container_size', 'container_type', 'commodity'];

function EditContainerNumbers({
	task = {},
	item = {},
	index = 0,
	selectedContainers = [],
	setSelectedContainers = () => {},
}) {
	const handleSelectedNumber = (val) => {
		const newSelectedContainers = [...selectedContainers];
		newSelectedContainers[index].container_numbers = val;

		setSelectedContainers(newSelectedContainers);
	};

	const SERVICE_DETAILS = [];
	DETAILS_KEYS.forEach((detail_key) => {
		if (item[detail_key]) {
			SERVICE_DETAILS.push(startCase(item[detail_key]));
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.flex_item}>
				<b>{startCase(task?.service_type)}</b>

				<div className={styles.service_details}>
					{!isEmpty(SERVICE_DETAILS) ? `(${SERVICE_DETAILS.join(', ')})` : null}
				</div>
			</div>

			<div className={styles.flex_item}>
				<b>Select Container Numbers</b>
				<MultiSelect
					multiple
					size="sm"
					value={selectedContainers[index].container_numbers}
					onChange={handleSelectedNumber}
					options={item.container_numbers}
					placeholder="Choose Container Numbers"
				/>
			</div>
		</div>
	);
}

export default EditContainerNumbers;
