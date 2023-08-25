import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from './getValue';
import styles from './styles.module.css';

const INCLUDE_LINE_SEPARATION = ['booking_mode', 'poc_email', 'lms_password'];
const DEFAULT_SPAN = 1;

function CardItem({
	fields = [],
	singleitem = {},
	functions = {},
	loading = false,
	isMobile = false,
	Child = <div />,
	open = '',
}) {
	return (
		<div>
			<section className={styles.list_container}>
				<div
					className={cl`${styles.row} ${
						isMobile ? styles.is_mobile : ''
					}`}
				>
					{fields.map((field) => {
						const itemStyle = field.styles || {};
						return (
							<>
								<div
									className={cl`${styles.col} ${field.className || ''} ${
										isMobile ? styles.is_mobile : ''
									}`}
									style={{
										'--span': (field.span || DEFAULT_SPAN),
										...itemStyle,
									}}
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
												) }
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
