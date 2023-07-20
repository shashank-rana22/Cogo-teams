import { cl, Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../common/CardList/CardItem/getValue';
import CONSTANTS from '../../../constants/constants';
import styles from '../styles.module.css';

function HawbListItem({ fields = [], item = {}, loading = false, functions = {} }) {
	return (
		<section className={styles.hawb_list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field) => {
					const itemStyle = field.styles || {};
					return (
						<div
							className={cl`${styles.col} ${field.className}`}
							style={{
								'--span': (field.span || CONSTANTS.DEFAULT_SPAN),
								...itemStyle,
							}}
							key={field.key}
						>
							{loading ? <Placeholder /> : (
								<div className={styles.flex}>
									{field.render ? field.render(item) : getValue(
										item,
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

export default HawbListItem;
