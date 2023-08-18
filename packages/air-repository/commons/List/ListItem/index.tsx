import { cl, Placeholder } from '@cogoport/components';
import React, { ReactNode, ReactFragment } from 'react';

import { FieldType, FunctionObjects, NestedObj } from '../Interfaces';

import getValue from './getValue';
import styles from './styles.module.css';

export interface Props {
	fields: FieldType[];
	singleitem?: NestedObj;
	functions?: FunctionObjects;
	loading?: boolean;
	isMobile?: boolean;
	Child?: ReactFragment;
	open?: string;
}

const INCLUDE_LINE_SEPARATION = ['booking_mode', 'poc_email', 'lms_password'];

function CardItem({
	fields = [],
	singleitem = {},
	functions = {},
	loading = false,
	isMobile = false,
	Child = <div />,
	open = '',
}:Props) {
	return (
		<div>
			<section className={styles.list_container}>
				<div
					className={cl`${styles.row} ${
						isMobile ? styles.is_mobile : ''
					}`}
				>
					{fields.map((field:FieldType) => {
						const itemStyle = field.styles || {};
						return (
							<>
								<div
									className={cl`${styles.col} ${field.className || ''} ${
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
								{INCLUDE_LINE_SEPARATION.includes(field.key)
								&& <div className="line_division" />}
							</>
						);
					})}
				</div>
			</section>
			{open === singleitem.id && (
				<Child
					data={singleitem}
				/>
			)}
		</div>
	);
}

export default CardItem;
