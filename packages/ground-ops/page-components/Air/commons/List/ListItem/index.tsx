import { Placeholder } from '@cogoport/components';
import React, { ReactNode } from 'react';

import { FieldType, FunctionObjects } from '../Interfaces/index';
import styles from '../styles.module.css';

import getValue from './getValue';

export interface Props {
	fields: FieldType[];
	singleitem?: any;
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
		<section className={styles.list_container}>
			<div
				className={`${styles.row} ${
					isMobile ? styles.is_mobile : ''
				}`}
			>
				{fields.map((field) => {
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

							<div className={styles.flex}>
								{loading ? <Placeholder />
									: (
										<div className={styles.flex}>
											{getValue(
												singleitem,
												field,
												functions,
												'-',
											) as ReactNode}
										</div>
									)}
							</div>

						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardItem;
