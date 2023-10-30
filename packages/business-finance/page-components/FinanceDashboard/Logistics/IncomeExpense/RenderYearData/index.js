import styles from './styles.module.css';

function RenderYearData(years, onClickFinancialYear) {
	return (
		<div>
			{(years || [])?.map((year) => (
				<div key={year} style={{ marginBottom: '10px', cursor: year === 'FINANCIALYEARS' && 'pointer' }}>
					<div
						key={year}
						role="presentation"
						onClick={() => onClickFinancialYear(year, years)}
					>
						{year}

					</div>
					<div className={styles.year_bottom_border} />
				</div>
			))}
		</div>
	);
}

export default RenderYearData;
