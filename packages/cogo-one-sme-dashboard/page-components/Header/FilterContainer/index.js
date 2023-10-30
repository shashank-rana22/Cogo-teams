import { useForm } from '@cogoport/forms';
import React from 'react';

import dashboardFilters from '../../../configurations/dashboard-filters';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function FilterContainer({
	setFilterParams = () => {},
	filterParams = {},
}) {
	const {
		control,
		formState: { errors = [] },
	} = useForm({
		defaultParams: {
			filterParams,
		},
	});

	const controls = dashboardFilters({ setFilterParams });

	return (
		<div className={styles.field_container}>
			{controls.map(
				(eachControl) => {
					const { controlType, name } = eachControl || {};
					const Element = getFieldController(controlType);

					if (!Element) {
						return null;
					}

					return (
						<div
							className={styles.each_element}
							key={name}
						>
							<Element
								control={control}
								{...eachControl}
								error={errors?.[name]}
							/>
						</div>
					);
				},
			)}
		</div>
	);
}

export default FilterContainer;
