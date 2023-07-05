import { Button, Pill } from '@cogoport/components';

import ObjectiveCard from './ObjectiveCard';
import styles from './styles.module.css';

function ListCard() {
	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.agent_detail}>
					<h4 className={styles.agent}>
						IE Owner SME Demand:
						<strong> Deeshant Rathi</strong>
					</h4>

					<Pill size="md">Entity: Cogo India</Pill>

					<Pill size="md">Channel:SME</Pill>
				</div>

				<Button type="button" themeType="secondary">Edit Distribution</Button>
			</div>

			{[1, 2, 3].map((item) => <ObjectiveCard key={item} />)}

			<div className={styles.create_new} role="presentation">+ Create New Objective For Agent</div>
		</div>
	);
}

export default ListCard;
