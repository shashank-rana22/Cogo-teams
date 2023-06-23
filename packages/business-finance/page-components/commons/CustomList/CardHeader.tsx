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
	renderHeaderCheckbox?:()=>(ReactNode | '');
}

function Header({
	fields, sort, setSort = () => [], headerStyles, renderHeaderCheckbox = () => '', showHeaderCheckbox = false,
}:Props) {
	const handleOnChangeSort = (item: FieldType, sortType) => {
		const fieldType = item.sorting!.name;
		setSort(() => ({
			[fieldType]: sort?.[fieldType] === sortType,
		}));
	};

	return (
		<header className={styles.header} style={headerStyles}>
			{showHeaderCheckbox && renderHeaderCheckbox()}
			{(fields || []).map((field) => (
				<div
					key={String(field?.label)}
					className={`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || 1 } as React.CSSProperties}
				>
					{field.label}
					{field.sorting && (
						<>
							<div className={styles.center}>
								<IcMArrowRotateUp
									className={styles.asc}
									onClick={() => handleOnChangeSort(field, 'asc')}
								/>
							</div>
							<div className={styles.centers}>
								<IcMArrowRotateDown
									className={styles.desc}
									onClick={() => handleOnChangeSort(field, 'desc')}
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
