import { Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from './getValue';
import styles from './styles.module.css';

function CardColumn({
	fields,
	itemStyles,
	singleitem,
	functions = {},
	config,
	isMobile,
	loading,
}) {
	const { clickable } = config;
	return (
		<section style={itemStyles}>
			<div
				className={`${styles.row} ${clickable ? styles.clickable : ''} ${
					isMobile ? styles.isMobile : ''
				}`}
			>
				{fields.map((field) => {
					const itemStyle = field.styles || {};
					return (
						<div
							className={`${styles.col} ${field.className || ''} ${
								isMobile ? styles.isMobile : ''
							}`}
							style={{
								'--span': (field.span || 1),
								...itemStyle,
							}}
						>
							{isMobile && (
								<div className={styles.tablelabel}>{field.label}</div>
							)}
							{loading ? <Placeholder />
								: (
									<div className={styles.flex}>
										{getValue(
											singleitem,
											field,
											functions,
											'-',
										)}
									</div>
								)}
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default CardColumn;
