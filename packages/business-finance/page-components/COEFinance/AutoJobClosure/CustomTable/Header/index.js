import { cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function Header({ config = {} }) {
	const { fields, headerClass } = config || {};
	const islevel = (heading = '') => {
		if (heading === 'Level 1' || heading === 'Level 2') return true;
		return false;
	};
	return (
		<section className={cl`${styles.header} ${headerClass === 'border' ? styles.border : ''}`}>
			{(fields || []).map((field) => (
				<div
					className={cl`${styles.col} ${field.className}`}
					key={field.key}
					style={{
						'--span' : field.span || DEFAULT_SPAN,
						width    : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
					}}
				>
					{field.label}
					{'  '}
					{ (islevel(field.label)
						? <IcMInfo className={styles.infoIcon} height={16} width={16} /> : null)}
				</div>
			))}
		</section>
	);
}

export default Header;
