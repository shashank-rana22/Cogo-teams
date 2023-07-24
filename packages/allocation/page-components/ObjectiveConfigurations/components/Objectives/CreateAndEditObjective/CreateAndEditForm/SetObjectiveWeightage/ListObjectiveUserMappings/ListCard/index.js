import { Pill } from '@cogoport/components';

import Objective from './Objective';
import styles from './styles.module.css';

function ListCard(props) {
	const { objectiveUserMappingData, control } = props;

	const { user, partner, role, objectives } = objectiveUserMappingData || {};

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

					{/* <Pill size="md">
						Channel:
						{' '}
						{role.role_sub_function}
					</Pill> */}
				</div>
			</div>

			{objectives.map((objective) => (
				<Objective
					key={objective.id}
					objective={objective}
					user={user}
					control={control}
				/>
			))}
		</div>
	);
}

export default ListCard;
