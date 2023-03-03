import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { ReactNode } from 'react';

import { NestedObj, FieldType } from '../Interfaces/index';

import styles from './styles.module.css';

export interface Props {
	fields: FieldType[];
	sort?: NestedObj;
	setSort?: React.Dispatch<React.SetStateAction<NestedObj>>;
	headerStyles?: React.CSSProperties;
	showHeaderCheckbox?:boolean;
	renderHeaderCheckbox?: () => (ReactNode | '');
}

function Header({
	fields, sort, setSort = () => [], headerStyles, renderHeaderCheckbox = () => '', showHeaderCheckbox = false,
}:Props) {
	const handleOnChangeUp = (item: FieldType) => {
		const fieldType = item.sorting!.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === 'asc' ? 'asc' : 'asc',
		}));
	};
	const handleOnChangeDown = (item: FieldType) => {
		const fieldType = item.sorting!.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === 'desc' ? 'desc' : 'desc',
		}));
	};
	return (
		<header className={styles.header} style={headerStyles}>
			{showHeaderCheckbox && renderHeaderCheckbox()}
			{fields.map((field) => (
				<div
					className={`${styles.col} ${field.className || ''}`}
					style={{
						'--span' : field.span || 1,
						width    : `${((field.span || 1) * (100 / 12))}px`,
					} as React.CSSProperties}
				>
					{field.label}
					{field.sorting && (
						<>
							<div className={styles.center}>
								<IcMArrowRotateUp
									className={
									sort?.[field.sorting.name] === 'asc' && styles.asc
								}
									onClick={() => handleOnChangeUp(field)}
								/>
							</div>
							<div className={styles.centers}>
								<IcMArrowRotateDown
									className={
								sort?.[field.sorting.name] === 'desc' && styles.desc
							}
									onClick={() => handleOnChangeDown(field)}
								/>
							</div>
						</>
					)}
				</div>
			))}
		</header>
	);
}

export default Header;
