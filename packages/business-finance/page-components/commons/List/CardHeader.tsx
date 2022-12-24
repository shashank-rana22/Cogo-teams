import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';

import { TypeObj } from './Interfaces/index';
import styles from './styles.module.css';

export interface Props {
	fields: any[];
	sort?: TypeObj;
	setSort?: Function;
	headerStyles?: React.CSSProperties;
}

function Header({
	fields, sort, setSort = () => [], headerStyles,
}:Props) {
	const handleOnChange = (item: { sorting: { name: any; }; }) => {
		const fieldType = item.sorting.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === 'asc' ? 'desc' : 'asc',
		}));
	};
	return (
		<header className={styles.header} style={headerStyles}>
			{fields.map((field) => (
				<div
					className={`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || 1 } as React.CSSProperties}
				>
					{field.label}
					{field.sorting && (
						<div className={styles.center}>
							<IcMArrowRotateDown
								className={
									sort?.[field.sorting.name] === 'asc' ? styles.asc : styles.desc
								}
								onClick={() => handleOnChange(field)}
							/>
						</div>
					)}
				</div>
			))}
		</header>
	);
}

export default Header;
