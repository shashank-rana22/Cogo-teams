import React from 'react';

import { getFieldController } from '../../utils/getFieldController';

import styles from './styles.module.css';

function RenderForm({ control = {}, errors = {}, controls = [] }) {
	return (
		<div className={styles.styled_form}>
			{(controls || []).map((eachControl = {}) => {
				const { label = '', controlType = '', name = '' } = eachControl || {};
				const Element = getFieldController(controlType) || null;

				return (Element && (
					<div className={styles.styled_element}>
						<div className={styles.label}>{label}</div>
						<Element control={control} {...eachControl} />
						<div className={styles.error_text}>
							{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
						</div>
					</div>
				));
			})}
		</div>
	);
}

export default RenderForm;
