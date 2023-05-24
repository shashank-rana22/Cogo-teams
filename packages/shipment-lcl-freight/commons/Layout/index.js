import React from 'react';

import FieldArray from './ChildFormat';
import Item from './Item';
import styles from './styles.module.css';

function Layout({
	formProps, controls, showElements = {},
}) {
	const { errors, register, control } = formProps;

	return (
		<div className={styles.layout}>
			{controls.map((controlField) => {
				const { type, heading = '' } = controlField;
				const show = (!(control.name in showElements) || showElements[controlField.name]);
				if (type === 'fieldArray' && show) {
					return (
						<div style={{ width: '100%' }}>
							<div className={styles.heading}>
								{heading}
							</div>

							<FieldArray
								{...controlField}
								error={errors[controlField.name]}
								control={control}
								register={register}
								showElements={showElements}
							/>

						</div>
					);
				}

				return show
					? (
						<Item
							control={control}
							error={{}}
							{...controlField}
						/>
					)
					: null;
			})}
		</div>
	);
}
export default Layout;
