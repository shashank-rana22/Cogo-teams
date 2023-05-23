import React, { useState, useEffect, ReactNode } from 'react';

import { FieldType, FunctionObjects } from '../Interfaces/index';

import getValue from './getValue';
import styles from './styles.module.css';

export interface Props {
	fields: FieldType[];
	singleitem?: any;
	functions?: FunctionObjects;
}

function CardItem({
	fields,
	singleitem,
	functions = {},
}:Props) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
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
							key={field.key}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}

							<div className={styles.flex}>
								{getValue(
									singleitem,
									field,
									functions,
									'-',
								) as ReactNode}
							</div>

						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardItem;
