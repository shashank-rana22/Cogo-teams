import { Accordion } from '@cogoport/components';
import React from 'react';

import FilterItem from './FilterItem';
import styles from './styles.module.css';

function FilterContent({ controls, control, watch, errors, setValue, handleSubmit }) {
	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label: itemLabel, controls: itemControls } = controlItem;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion type="text" title={itemLabel} style={{ width: '100%' }}>

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
