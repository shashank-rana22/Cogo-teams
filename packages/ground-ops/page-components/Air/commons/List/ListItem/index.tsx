import { Placeholder } from '@cogoport/components';
import React, { ReactNode, ReactFragment } from 'react';

import { FieldType, FunctionObjects, NestedObj } from '../Interfaces/index';
import styles from '../styles.module.css';

import getValue from './getValue';

export interface Props {
	fields: FieldType[];
	singleitem?: NestedObj;
	functions?: FunctionObjects;
	loading?: boolean;
	isMobile?: boolean;
	isOpen?: string;
	Child?: ReactFragment;
}

function CardItem({
	fields,
	singleitem,
	functions = {},
	loading = false,
	isMobile = false,
	isOpen = '',
	Child = () => {},
}:Props) {
	return (
		<div>
			<section className={styles.list_container}>
				<div
					className={`${styles.row} ${
						isMobile ? styles.is_mobile : ''
					}`}
				>
					{fields.map((field:FieldType) => {
						const itemStyle = field.styles || {};
						return (
							<div
								className={`${styles.col} ${field.className || ''} ${
									isMobile ? styles.is_mobile : ''
								}`}
								style={{
									'--span': (field.span || 1),
									...itemStyle,
								} as React.CSSProperties}
							>
								{isMobile && (
									<div className={styles.tablelabel}>{field.label}</div>
								)}

								{loading ? <Placeholder />
									: (
										<div className={styles.flex}>
											{field.render ? field.render(singleitem) : getValue(
												singleitem,
												field,
												functions,
												'-',
											) as ReactNode }
										</div>
									)}

							</div>
						);
					})}

				</div>
			</section>
			{isOpen === singleitem.id && (
				<Child
					data={singleitem}
				/>
			)}
		</div>
	);
}

export default CardItem;
