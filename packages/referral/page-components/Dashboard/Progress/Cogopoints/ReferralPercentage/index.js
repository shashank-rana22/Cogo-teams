import styles from './styles.module.css';

const REFERRAL_TOTAL_COUNT = 0;
const REFERRAL_TOTAL_PERCENTAGE = 100;

function ReferralPercentage({ data = [] }) {
	const totalCount = data.reduce(
		(total, item) => total + (item?.value || REFERRAL_TOTAL_COUNT),
		REFERRAL_TOTAL_COUNT,
	);
	const eachPercentage = (data || []).map((item) => ({
		...item,
		percentage: Math.round((item.value / totalCount) * REFERRAL_TOTAL_PERCENTAGE),
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
