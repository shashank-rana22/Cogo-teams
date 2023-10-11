import { cl } from '@cogoport/components';
import React from 'react';

import { getFieldController } from '../../helper/getFieldController';

import styles from './styles.module.css';

function FormItem({ controls, formhook }) {
	const {
		control,
		register,
		formState:{ errors = {} },
	} = formhook;

	return (
		controls.map((config) => {
			const { name, type, label, rules, showEle = true } = config;
			const Element = getFieldController(type);
			const isMobileNo = type === 'mobileSelect';

			return (
				showEle ? (
					<div key={name} className={cl`${styles.col} ${name} form_col`}>
						<p className={styles.label}>{label}</p>
						<Element
							{...config}
							control={control}
							type="card"
							mobileSelectRef={isMobileNo ? register(name, rules).ref : undefined}
						/>
						<p className={styles.error}>{errors?.[name]?.message || errors?.[name]?.type}</p>
					</div>
				) : null
			);
		})
	);
}

export default FormItem;
