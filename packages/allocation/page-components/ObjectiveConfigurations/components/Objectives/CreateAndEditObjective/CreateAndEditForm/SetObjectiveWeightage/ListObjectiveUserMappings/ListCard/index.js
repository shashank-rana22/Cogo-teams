import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import Objective from './Objective';
import styles from './styles.module.css';

const DEFAULT_WEIGHTAGE = 100;

function ListCard(props) {
	const { objectiveUserMappingData, control, formValues } = props;

	const { user, partner, role, objectives } = objectiveUserMappingData || {};

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.agent_detail}>
					<p className={styles.agent}>
						{role.name}
						:
						{' '}
						<strong>{user.name}</strong>
					</p>

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

			<Objective
				currentObjective
				className={styles.current_objective}
				objective={formValues.generalConfiguration}
				user={user}
				control={control}
				defaultWeightage={isEmpty(objectives) && DEFAULT_WEIGHTAGE}
			/>

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
