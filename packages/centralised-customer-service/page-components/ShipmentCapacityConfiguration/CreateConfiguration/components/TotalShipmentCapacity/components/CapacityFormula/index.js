import { RadioGroup } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

const SLAB_UPPER_LIMIT_MAX = 99999;
const DEFAULT_VALUE = 0;

const getUpperLimit = (slab_upper_limit) => {
	let result = '';

	if (slab_upper_limit && slab_upper_limit !== SLAB_UPPER_LIMIT_MAX) {
		result = `-${slab_upper_limit} `;
	} else result = '+';

	return result;
};

function CapacityFormula({ data = {} }) {
	const [value, setValue] = useState(DEFAULT_VALUE);

	const CAPACITY_OBJECT = {};

	const radioOptions = data.agent_experience_slab_details?.map((slab) => {
		const { slab_lower_limit = 0, slab_upper_limit = 0, slab_unit = 'month' } = slab;

		CAPACITY_OBJECT[slab_lower_limit] = DEFAULT_VALUE;

		return {
			name  : slab_lower_limit,
			value : slab_lower_limit,
			label : `${slab_lower_limit}${getUpperLimit(slab_upper_limit)} ${slab_unit}s`,
		};
	});

	data.shipment_capacities?.forEach((capacity) => {
		const { slab_lower_limit = 0, shipment_capacity = 0, normalized_capacity = 0 } = capacity;
		CAPACITY_OBJECT[slab_lower_limit] += (shipment_capacity * normalized_capacity);
	});

	const TOTAL_CAPACITY = Object.values(CAPACITY_OBJECT).reduce((acc, currValue) => acc + currValue, DEFAULT_VALUE);

	return (
		<div className={styles.container}>

			<RadioGroup
				options={radioOptions}
				onChange={(val) => {
					setValue(Number(val));
				}}
				value={value}
			/>

			<div className={styles.individual_capacity}>
				<div className={styles.title}>Individual Combined Capacity</div>

				<div>

					<div className={styles.inner_container_one}>
						<div className={styles.equal_sign}>&#61;</div>

						<div className={styles.value}>
							<div className={styles.symbol}>&#931;</div>

							<div className={styles.formula}>
								<div>Number of shipments in Service with least capacity</div>
								<div className={styles.divider} />
								<div>Capacity of shipments for Each Service</div>
							</div>
						</div>
					</div>

					<div className={styles.inner_container_one}>
						<div className={styles.equal_sign}>&#61;</div>

						<div className={styles.value}>
							{CAPACITY_OBJECT[value.toString()]}
						</div>
					</div>

				</div>

			</div>

			<div className={styles.individual_capacity}>
				<div className={styles.title}>Total Capacity</div>

				<div>

					<div className={styles.inner_container_two}>
						<div className={styles.equal_sign}>&#61;</div>

						<div className={styles.value}>
							<div className={styles.symbol}>
								&#931;
								{' '}
								<span>Individual Combined Capacity</span>
							</div>
						</div>
					</div>

					<div className={styles.inner_container_one}>
						<div className={styles.equal_sign}>&#61;</div>

						<div className={styles.value}>
							{TOTAL_CAPACITY}
						</div>
					</div>

				</div>

			</div>

		</div>
	);
}

export default CapacityFormula;
