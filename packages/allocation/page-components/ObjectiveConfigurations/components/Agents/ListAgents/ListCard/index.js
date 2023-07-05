import { Accordion, Button, Pill } from '@cogoport/components';

import ObjectiveDetailsCard from '../../../../common/ObjectiveDetailsCard';

import styles from './styles.module.css';

function ListCard(props) {
	const { item } = props;

	const { role, user, partner, objectives } = item;

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.agent_detail}>
					<h4 className={styles.agent}>
						{role.name}
						:
						{' '}
						<strong>{user.name}</strong>
					</h4>

					<Pill size="md">
						Entity:
						{' '}
						{partner.business_name}
					</Pill>

					<Pill size="md">
						Channel:
						{' '}
						{role.role_sub_function}
					</Pill>
				</div>

				<Button type="button" themeType="secondary">Edit Distribution</Button>
			</div>

			{objectives.map((objective) => (
				<Accordion
					key={item.id}
					className={styles.accordian}
					type="text"
					title="Text Accordion"
				>
					<ObjectiveDetailsCard activeObjectiveId={objective.id} />
				</Accordion>
			))}

			<div className={styles.create_new} role="presentation">+ Create New Objective For Agent</div>
		</div>
	);
}

export default ListCard;
