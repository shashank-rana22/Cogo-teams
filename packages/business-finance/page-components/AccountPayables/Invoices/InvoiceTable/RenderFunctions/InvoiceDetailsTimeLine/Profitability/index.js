import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Profitability({ data, loading }) {
	const { quotationalProfit, tentativeProfit } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.subcontainer}>
				<div className={styles.quotation_profit_style}>
					<div className={styles.quotation}>Quotational</div>
					{loading ? (
						<Placeholder width="50px" height="10px" margin="10px 0px" />
					) : (
						<div className={styles.quotation_profit}>
							{quotationalProfit ? (
								`${quotationalProfit}%`
							) : (
								<div style={{ color: '#ed3726' }}>DATA NOT FOUND</div>
							)}
						</div>
					)}
				</div>
			</div>
			<div className={styles.subcontainer}>
				<div className={styles.tentative_profit_style}>
					<div className={styles.tentative}>Tentative</div>
					{loading ? (
						<Placeholder width="50px" height="10px" margin="10px 0px" />
					) : (
						<div className={styles.tentative_profit}>
							{tentativeProfit ? (
								`${tentativeProfit}%`
							) : (
								<div style={{ color: '#ed3726' }}>DATA NOT FOUND</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
export default Profitability;
