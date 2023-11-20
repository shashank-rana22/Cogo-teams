import React from 'react';

import styles from './styles.module.css';

export default function TableCustom(
	{ columns = [], data = {} },
) {
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				{
                    columns.map((elem) => (<div className={styles.header} key={elem.accessor}>{elem.Header}</div>))
                }
			</div>
			<div className={styles.data_container}>
				{
                    data.map((elem) => (
	<div
		className={elem.is_group
			? styles.data_group : styles.data}
		key={elem.heading}
	>
		<div
			className={elem.is_group
				? styles.heading_group : styles.data_heading}
			key={elem.heading}
		>
			{elem.heading}
		</div>
		<div
			className={elem.is_group
				? styles.heading_group : styles.data_heading}
			key={elem.yearlyValue}
		>
			{elem.yearlyValue}

		</div>
		<div
			className={elem.is_group
				? styles.heading_group : styles.data_heading}
			key={elem.monthlyValue}
		>
			{elem.monthlyValue}
		</div>
	</div>
                    ))
}
			</div>
		</div>
	);
}
