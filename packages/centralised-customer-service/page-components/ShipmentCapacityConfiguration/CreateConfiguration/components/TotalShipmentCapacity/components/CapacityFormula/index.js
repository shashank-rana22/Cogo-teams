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
			label : `${slab_lower_limit}${getUpperLimit(slab_upper_limit)} ${slab_unit}`,
		};
	});

	data.shipment_capacities?.forEach((capacity) => {
		const { slab_lower_limit = 0, shipment_capacity = 0, normalized_capacity = 0 } = capacity;
		CAPACITY_OBJECT[slab_lower_limit] += (shipment_capacity * normalized_capacity);
	});

	return (
		<div className={styles.container}>

			<div className={styles.individual_capacity}>
				<div>Individual Combined Capacity</div>

				<div>

					<div className={styles.inner_container}>
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

					<div className={styles.inner_container}>
						<div className={styles.equal_sign}>&#61;</div>

						<div className={styles.value}>
							{CAPACITY_OBJECT[value]}
						</div>
					</div>

				</div>

			</div>

			<RadioGroup options={radioOptions} onChange={(val) => setValue(val)} value={value} />
		</div>
	);
}

export default CapacityFormula;
