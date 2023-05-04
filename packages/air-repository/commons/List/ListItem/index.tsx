import { Placeholder } from '@cogoport/components';
import React, { ReactNode } from 'react';

import { FieldType, FunctionObjects, NestedObj } from '../Interfaces/index';
import styles from '../styles.module.css';

import getValue from './getValue';

export interface Props {
	fields: FieldType[];
	singleitem?: NestedObj;
	functions?: FunctionObjects;
	loading?: boolean;
	isMobile?: boolean;
}

function CardItem({
	fields,
	singleitem,
	functions = {},
	loading = false,
	isMobile = false,
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
								<div className="line_division" />

								{loading ? <Placeholder />
									: (
										<div
											className={styles.flex}
										>
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
		</div>
	);
}

export default CardItem;
