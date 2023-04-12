import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function Title({ cardTitles = [], titleData = [], rowData = [], watchFields = [], parentIndex = 0, emptyValues = [] }) {
	const [rowTotal, setRowTotal] = useState(0);
	useEffect(() => {
		let sum = 0;
		for (let i = 0; i < rowData.length; i += 1) {
			sum += Number(watchFields[emptyValues[parentIndex][i]]) + Number(rowData[i].base_price);
		}
		setRowTotal(sum);
	}, [watchFields, emptyValues, rowData, parentIndex]);

	return (
		<div className={styles.container}>

			<div className={styles.card_title}>
				{cardTitles.map((itm) => (
					<div className={`${styles.column_labels} ${styles[`${itm.name}_card_title`]}`}>
						{itm.name === 'sell_price' ? (
							<span className={styles.green_text}>
								Total:
								{' '}
								{/* {titleData?.[`${itm.name}`]} */}
								{/* {total.reduce((t, v) => t + v)} */}
								{/* {JSON.stringify(values)} */}
								{rowTotal}
								{' '}
							</span>
						) : (
							<span>
								{titleData?.[`${itm.name}`]}
							</span>
						) }

						{itm.name === 'service'
							&& (
								<>
									{titleData.labels.map((label) => (
										<div className={styles.tags}>
											{ label }
										</div>
									))}
								</>
							)}
					</div>
				))}
			</div>
		</div>
	);
}
export default Title;
