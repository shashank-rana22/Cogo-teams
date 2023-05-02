import { useMemo } from 'react';

import { getFormattedAmount } from '../../../../../../common/helpers/getFormattedSum';

import styles from './styles.module.css';

function Title({
	cardTitles = [], titleData = [],
	rowData = [], watchFields = [], parentIndex = 0,
	emptyValues = [], setIndividualTotal = [], individualTotal = 0,
}) {
	const sum = rowData.reduce((acc, curr, i) => {
		const currentValue = Number(watchFields[emptyValues[parentIndex][i]]) + Number(curr.base_price);
		return acc + currentValue;
	}, 0);

	useMemo(() => {
		setIndividualTotal((prev) => {
			const newArr = prev;
			newArr[parentIndex] = sum;
			return [...newArr];
		});
	}, [sum, parentIndex, setIndividualTotal]);

	return (
		<div className={styles.container}>

			<div className={styles.card_title}>
				{cardTitles.map((itm) => (
					<div className={`${styles.column_labels} ${styles[`${itm.name}_card_title`]}`}>
						{itm.name === 'sell_price' ? (
							<span className={styles.green_text}>
								Total:
								{' '}
								{getFormattedAmount(individualTotal[parentIndex], 'INR')}
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
