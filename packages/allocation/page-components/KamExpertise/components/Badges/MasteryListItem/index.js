import { Button } from '@cogoport/components';
import { useState } from 'react';

import MasteryCard from './MasteryCard';
import styles from './styles.module.css';

function MasteryListItem() {
	// const [openModal, setOpenModal] = useState(false);
	// const [medalType, setMedalType] = useState('');

	const [ruleType, setRuleType] = useState(1);

	// const {
	// 	onCheckPublish, loadingCheckPublishability,
	// } = useBadgeConfiguration();
	// // } = useBadgeConfigurationAttributes();

	// const handleClick = (e) => {
	// 	setOpenModal((pv) => !pv);
	// 	setMedalType(e);
	// };

	return (
		<div className={styles.container}>
			<div className={styles.number_tag}>
				<p>
					#000
					{ruleType}
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
								Nautical Ninja
							</b>
						</p>
					</div>

					<div className={styles.desc}>
						<p>Description : Surface Stuff</p>
					</div>

					<div className={styles.modified}>
						<p>Last Modified : 31/September/2023</p>
						<p>Last Modified By : Ankur Verma</p>
					</div>
				</div>

				<div className={styles.score_container}>
					<MasteryCard />
				</div>
			</div>
		</div>
	);
}

export default MasteryListItem;
