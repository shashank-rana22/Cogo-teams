import { cl } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

const HUNDERED_PERCENT = 100;

const TOTAL_SPAN = 12;

function Header({ config = {} }) {
	const { fields = [] } = config || {};
	const islevel = (heading = '') => (['Level 1', 'Level 2'].includes(heading));
	return (
		<section className={cl`${styles.header} ${styles.border}`}>
			{(fields || []).map((field) => (
				<div
					className={cl`${styles.col} ${field.className}`}
					key={field.key}
					style={{
						flex  : field.span || DEFAULT_SPAN,
						width : `${((field.span || DEFAULT_SPAN) * (HUNDERED_PERCENT / TOTAL_SPAN))}px`,
					}}
				>
					{field?.label}
					{'  '}
					{ (islevel(field?.label)
						? <IcMInfo className={styles.infoIcon} height={16} width={16} /> : null)}
				</div>
			))}
		</section>
	);
}

export default Header;
