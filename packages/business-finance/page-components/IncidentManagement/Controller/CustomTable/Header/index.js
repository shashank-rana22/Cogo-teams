import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function Header({ config = {} }) {
	const { fields, headerClass } = config;
	return (
		<section className={cl`${styles.header} ${headerClass === 'border' ? styles.border : ''}`}>
			{fields.map((field) => (
				<div
					className={cl`${styles.col} ${field.className || ''}`}
					key={field.key}
					style={{
						'--span' : field.span || DEFAULT_SPAN,
						width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
					}}
				>
					{field.label}
				</div>
			))}
		</section>
	);
}

export default Header;
