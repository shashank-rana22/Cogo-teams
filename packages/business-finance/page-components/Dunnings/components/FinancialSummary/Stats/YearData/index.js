import React from 'react';

import styles from './styles.module.css';

function YearData({ years = [], onClickFinancialYear = () => {} }) {
	return (
		<div>
			{years.map((year) => (
				<div
					key={year}
					className={styles.year_bottom_border}
					style={{ cursor: year === 'financialYears' && 'pointer' }}
				>
					<div
						key={year}
						role="presentation"
						onClick={() => onClickFinancialYear(year, years)}
					>
						{year}
					</div>
				</div>
			))}
		</div>
	);
}

export default YearData;
