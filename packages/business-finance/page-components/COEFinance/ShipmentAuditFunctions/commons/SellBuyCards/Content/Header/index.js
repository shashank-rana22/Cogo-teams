import { cl } from '@cogoport/components';
import React from 'react';

import config from '../../../../configurations/fin-opr-config';

import styles from './styles.module.css';

function Header() {
	const { headerStyles = {}, fields = [] } = config || {};
	return (
		<header className={styles.header} style={headerStyles}>
			{(fields || []).filter((itm) => !itm?.hideColumn)?.map((field) => (
				<div
					className={cl`${styles.col} ${field?.className || ''}`}
					style={{
						'--span' : field?.span || 1,
						width    : `${((field?.span || 1) * (100 / 12))}px`,
					}}
					key={field?.key}
				>
					{field?.label}
				</div>
			))}
		</header>
	);
}

export default Header;
