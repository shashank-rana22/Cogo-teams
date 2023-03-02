import { Pill, Button } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

const data = {
	event_name  : 'Multimodal Maestro',
	description : 'Multimodal maestro is awarded to users who complete gold 3 in all of these badges',
	rules       : [
		{
			badge_name: 'Nautical Ninja',
		},
		{
			badge_name: 'Highway Hero',
		},
		{
			badge_name: 'Wings of Logistics',
		},
	],
	// last_modified_date : '31/September/2022',
	last_modified_date : '2022-Sept-31',
	last_modified_by   : 'Ankur Verma',
	url                : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/gold_ninja_badge.svg',

};

function MasteryListItem() {
	const [ruleType, setRuleType] = useState(1);

	// const {
	// 	onCheckPublish, loadingCheckPublishability,
	// } = useCreateBadgeConfiguration();
	// // } = useBadgeConfigurationAttributes();

	const handleSubmit = () => {
		// console.log('edit button clicked');
	};
	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<p>
					#000
					{ruleType}
				</p>
				<Button themeType="secondary" onClick={handleSubmit}>Edit</Button>
			</div>

			<div className={styles.content}>
				<div className={styles.details}>
					<div>
						<div style={{ paddingBottom: '12px' }}>
							Event Name :
							{' '}
							<b>{data.event_name}</b>
						</div>
						<div>
							Description :
							{' '}
							{data.description}
						</div>
					</div>
					<div className={styles.modified}>
						<div>
							Last Modified :
							{' '}
							{data.last_modified_date}
						</div>
						<div>
							Last Modified By:
							{' '}
							{data.last_modified_by}
						</div>
					</div>
				</div>

				<div className={styles.rules}>
					<div className={styles.rule_heading}>Rules</div>
					<span>Mastery in</span>
					{
                        data.rules.map((item) => (
	<span className={styles.pill}>
		<Pill color="#edd7a9">{item.badge_name}</Pill>

	</span>
                        ))
                    }
				</div>

				<div className={styles.badge}>
					<img
						height={140}
						style={{ objectFit: 'contain' }}
						src={data.url}
						alt="Mastery Modal"
					/>
				</div>
			</div>
		</div>
	);
}

export default MasteryListItem;
