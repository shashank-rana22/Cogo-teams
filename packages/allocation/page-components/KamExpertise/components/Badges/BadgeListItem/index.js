import { Button } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

// import useBadgeConfiguration from '../../../hooks/useBadgeConfiguration';
// import useBadgeConfigurationAttributes from '../../../hooks/useBadgeConfigurationAttributes';
// import GetCard from '../CreateBadge/getCard';

import BadgeCard from './BadgeCard';
import styles from './styles.module.css';

function BadgeListItem({ data, index }) {
	// const [openModal, setOpenModal] = useState(false);
	// const [medalType, setMedalType] = useState('');

	// const [ruleType, setRuleType] = useState(1);

	// const {
	// 	onCheckPublish, loadingCheckPublishability,
	// } = useBadgeConfiguration();
	// // } = useBadgeConfigurationAttributes();

	// const handleClick = (e) => {
	// 	setOpenModal((pv) => !pv);
	// 	setMedalType(e);
	// };
	const { badge_details = [] } = data;
	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				<p>
					#
					{index + 1}
				</p>
				<Button themeType="secondary">Edit</Button>
			</div>

			<div className={styles.main_card}>

				<div className={styles.card_description}>
					<div className={styles.badge_name_tag}>
						<p>
							Badge Name
							{' '}
							:
							{'  '}
							<b>
								{data.badge_name}
							</b>
						</p>
					</div>

					<div className={styles.desc}>
						<p>
							Description :
							{' '}
							{data.description}
						</p>
					</div>

					<div className={styles.modified}>
						<p>
							Last Modified :
							{' '}
							{format(data.updated_at, 'yyyy-MMM-dd')}
						</p>

						{/* // needs changes */}
						<p>Last Modified By : Ankur Verma</p>
					</div>
				</div>

				<div className={styles.score_container}>
					<h3 style={{ color: '#4f4f4f' }}>Scores</h3>
					<div className={styles.score_badge}>
						{
							badge_details.map((badge, i) => (
								<BadgeCard
									medalType={startCase(badge.medal)}
									score={badge.score}
									image_url={badge.image_url}
									isLast={i === badge_details.length - 1}
								/>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BadgeListItem;
