import { cl, Placeholder } from '@cogoport/components';

import { STATS_CARDS } from '../../../constants';
import { formatValue, statsPercentageValue } from '../../../utils/formatValue';

import styles from './styles.module.css';

const STATS_COUNT = 0;

const handleChange = ({ name, setActiveStatsCard }) => {
	setActiveStatsCard(name);
};

function Stats({
	setActiveStatsCard = () => {},
	activeStatsCard = '',
	activeHeaderTab = '',
	data,
	loading = false,
	currencyCode = '',
}) {
	return (
		<div className={styles.container}>
			{STATS_CARDS.map((item) => {
				const { label, name, access } = item || {};
				const showStats = !['liability_point_value', 'total_burnt_point_value'].includes(name);

				if (!access.includes(activeHeaderTab)) {
					return null;
				}

				return (
					<div
						className={cl`${styles.stats_div}
							${activeStatsCard === name ? styles.active_stats_div : ''}`}
						key={name}
						role="presentation"
						onClick={() => handleChange({ name, setActiveStatsCard })}
					>
						<div className={styles.titles}>{label}</div>
						<div className={styles.sub_div}>
							<div className={styles.numbers}>
								{loading
									? <Placeholder width={100} height={25} />
									: `${currencyCode} ${formatValue(data?.[name] || STATS_COUNT)}`}
							</div>
							{showStats && (
								<div className={styles.numbers}>
									{statsPercentageValue({ data, name }) || STATS_COUNT}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Stats;
