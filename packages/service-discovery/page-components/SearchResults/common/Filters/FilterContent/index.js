import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import FilterItem from './FilterItem';
import styles from './styles.module.css';

const ZEROTH_INDEX = 0;

function FilterContent({
	controls = [],
	control = () => {},
	watch = () => {},
	errors = {},
	setValue = () => {},
	handleSubmit = () => {},
	filters = {},
}) {
	function AccordianContent({ label = '', name = '' }) {
		return (
			<div className={styles.label_container}>
				{label}

				{filters[name] && typeof filters[name] !== 'object' ? (
					<span className={styles.filter_value}>
						{startCase(filters[name])}
					</span>
				) : null}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem, index) => {
					const { label: itemLabel, controls: itemControls, name } = controlItem;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion
								type="text"
								title={<AccordianContent label={itemLabel} name={name} />}
								style={{ width: '100%' }}
								isOpen={index === ZEROTH_INDEX}
							>
								<FilterItem
									controls={itemControls}
									control={control}
									watch={watch}
									errors={errors}
									handleSubmit={handleSubmit}
									setValue={setValue}
								/>
							</Accordion>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FilterContent;
