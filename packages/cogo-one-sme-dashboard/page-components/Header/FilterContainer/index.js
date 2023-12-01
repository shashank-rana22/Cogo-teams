import React from 'react';

import dashboardFilters from '../../../configurations/dashboard-filters';
import { getFieldControls } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function FilterContainer({
	setFilterParams = () => {},
	filterParams = {},
}) {
	const controls = dashboardFilters({ setFilterParams, filterParams });

	return (
		<div className={styles.field_container}>
			{controls.map(
				(eachControl) => {
					const { controlType = '', name = '' } = eachControl || {};
					const Element = getFieldControls(controlType);

					if (!Element) {
						return null;
					}

					return (
						<div
							className={styles.each_element}
							key={name}
						>
							<Element
								{...eachControl}
								size="sm"
								onChange={(val) => setFilterParams(
									(prev) => ({
										...prev,
										[name]      : val,
										renderCount : (prev?.renderCount || 1) + 1,
									}),
								)}
							/>
						</div>
					);
				},
			)}
		</div>
	);
}

export default FilterContainer;