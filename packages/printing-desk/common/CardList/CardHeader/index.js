import { cl } from '@cogoport/components';
import React from 'react';

import CONSTANTS from '../../../constants/constants';

import styles from './styles.module.css';

function Header({ fields = [] }) {
	return (
		<header className={styles.header}>
			{(fields || []).map((field) => (
				<div
					className={cl`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || CONSTANTS.DEFAULT_SPAN }}
					key={field.key}
				>
					{ field.label }
				</div>
			))}
		</header>
	);
}

export default Header;
