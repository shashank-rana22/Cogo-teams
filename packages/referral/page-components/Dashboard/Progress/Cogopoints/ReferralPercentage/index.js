import styles from './styles.module.css';

const DEFAULT_COUNT = 0;
const TOTAL_PERCENTAGE = 100;

function ReferralPercentage({ data = [] }) {
	const totalCount = data.reduce(
		(total, item) => total + (item?.value || DEFAULT_COUNT),
		DEFAULT_COUNT,
	);
	const eachPercentage = (data || []).map((item) => ({
		...item,
		percentage: Math.round((item.value / totalCount) * TOTAL_PERCENTAGE),
	}));

	return (
		<div className={styles.container}>
			{(eachPercentage || []).map((type) => {
				const { color = '', percentage = '', id = '' } = type || {};
				return (
					<div className={styles.pair} key={id}>
						<div className={styles.circle} style={{ background: `${color}` }} />
						<div className={styles.name}>
							{percentage}
							%
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ReferralPercentage;
