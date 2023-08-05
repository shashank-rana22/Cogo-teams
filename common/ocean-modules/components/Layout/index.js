import { cl } from '@cogoport/components';
import React, { useMemo } from 'react';

import EditServiceCharges from '../EditServiceCharges';

import FieldArray from './ChildFormat';
import getTotalFields from './helpers/getTotalFields';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	control = {}, fields = [], showElements = {}, errors = {}, customValues = {}, formValues = {},
	disabledProps = false,
}) {
	const { TOTAL_FIELDS = [] } = getTotalFields({ fields, showElements });

	const keysForFields = useMemo(
		() => Array(TOTAL_FIELDS.length).fill(null).map(() => Math.random()),
		[TOTAL_FIELDS.length],
	);

	return (
		<main className={styles.layout}>
			{TOTAL_FIELDS.map((rowFields, i) => (
				<div className={cl`${styles.row} form_layout_row`} key={keysForFields[i]}>
					{rowFields.map((field) => {
						const { type, heading = '', name = '' } = field || {};

						if (type === 'fieldArray') {
							return (
								<section className={styles.width_100} key={field.name}>
									{heading ? (
										<div className={styles.heading}>
											{heading}
										</div>
									) : null}

									<FieldArray
										{...field}
										error={errors?.[name]}
										control={control}
										showElements={showElements}
										formValues={formValues}
									/>
								</section>
							);
						}
						if (type === 'edit_service_charges') {
							return (
								<section className={styles.width_100} key={field.name}>
									<EditServiceCharges
										error={errors?.[field?.name]}
										control={control}
										customValues={customValues?.[field?.name]}
										disabledProps={disabledProps}
										{...field}
									/>
								</section>
							);
						}

						return (
							<Item
								key={field.name}
								control={control}
								error={errors?.[name]}
								formValues={formValues}
								{...field}
							/>
						);
					})}
				</div>
			))}
		</main>
	);
}
export default Layout;
