import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { ReactNode } from 'react';

import { NestedObj, FieldType } from '../Interfaces/index';
import styles from './styles.module.css';

export interface Props {
	fields: FieldType[];
	sort?: NestedObj;
	setSort?: React.Dispatch<React.SetStateAction<NestedObj>>;
	headerStyles?: React.CSSProperties;
	showHeaderCheckbox?:boolean;
	renderHeaderCheckbox?:()=>(ReactNode | '');
}

function Header({
	fields, sort, setSort = () => [], headerStyles, renderHeaderCheckbox = () => '', showHeaderCheckbox = false,
}:Props) {
	const handleOnChange = (item: FieldType) => {
		const fieldType = item.sorting!.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === 'asc' ? 'desc' : 'asc',
		}));
	};
	return (
		<header className={styles.header} style={headerStyles}>
			{showHeaderCheckbox && renderHeaderCheckbox()}
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
