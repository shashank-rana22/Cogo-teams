import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Profitability({ data, loading }) {
	const { quotationalProfit, tentativeProfit } = data || {};

	const sectionsConfig = [{
		className    : styles.quotation_profit_style,
		label        : 'Quotational',
		value        : quotationalProfit,
		fallbackText : 'DATA NOT FOUND',
		labelClass   : styles.quotation,
	}, {
		className    : styles.tentative_profit_style,
		label        : 'Tentative',
		value        : tentativeProfit,
		fallbackText : 'DATA NOT FOUND',
		labelClass   : styles.tentative,
	}];

	return (
		<div className={styles.container}>
			{sectionsConfig.map((config) => (
				<div className={styles.subcontainer} key={config.label}>
					<div className={config.className}>
						<div className={config.labelClass}>{config.label || ''}</div>
						{loading ? (
							<Placeholder width="50px" height="10px" margin="10px 0px" />
						) : (
							<div className={styles.quotation_profit}>
								{config.value ? (
									`${config.value}%`
								) : (
									<div style={{ color: '#ed3726' }}>{config.fallbackText}</div>
								)}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
export default Profitability;
