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
			[fieldType]: sortType,
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
							<div className={`${styles.up_icon} ${Object.values(sort || {})?.includes('asc')
								? styles.is_active
								: null} `}
							>
								<IcMArrowRotateUp
									onClick={() => handleOnChangeSort(field, 'asc')}
								/>
							</div>
							<div className={`${styles.down_icon} ${Object.values(sort || {})?.includes('desc')
								? styles.is_active
								: null} `}
							>
								<IcMArrowRotateDown
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
