import { cl, Placeholder } from '@cogoport/components';

import { STATS_CARDS } from '../../../constants';
import { formatValue, statsPercentageValue } from '../../../utils/formatValue';

import styles from './styles.module.css';

const STATS_DEFAULT_COUNT = 0;

function StatsDiv({
	setActiveStatsCard = () => {},
	activeStatsCard = '',
	activeHeaderTab = '',
	data,
	loading = false,
	currencyCode = '',
}) {
	const handleChange = (val) => {
		setActiveStatsCard(val);
	};

	return (
		<div className={styles.container}>
			{STATS_CARDS.map(({ label, name, access }) => {
				const showStats = name !== 'liability_point_value' && name !== 'total_burnt_point_value';
				if (access.includes(activeHeaderTab)) {
					return (
						<div
							className={cl`${styles.stats_div}
							${activeStatsCard === name ? styles.active_stats_div : ''}`}
							key={name}
							role="presentation"
							onClick={() => handleChange(name)}
						>
							<div className={styles.titles}>{label}</div>
							<div className={styles.sub_div}>
								<div className={styles.numbers}>
									{loading
										? <Placeholder width={100} height={25} />
										: `${currencyCode} ${formatValue(data?.[name])}` || STATS_DEFAULT_COUNT}
								</div>
								{showStats && (
									<div className={styles.numbers}>{statsPercentageValue({ data, name })}</div>
								)}
							</div>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default StatsDiv;
