import { Pill } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ObjectiveAccordian from '../ObjectiveAccordian';

import styles from './styles.module.css';

const DEFAULT_WEIGHTAGE = 100;

function ListCard(props) {
	const { objectiveUserMappingData, control, formValues } = props;

	const { user, role, objectives = [] } = objectiveUserMappingData || {};

	const { generalConfiguration: { partner = {} } = {} } = formValues;

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

			<ObjectiveAccordian
				currentObjective
				formValues={formValues}
				objective={formValues.generalConfiguration}
				user={user}
				role={role}
				control={control}
				defaultWeightage={isEmpty(objectives) && DEFAULT_WEIGHTAGE}
			/>

			{objectives.map((item) => (
				<ObjectiveAccordian
					key={item.objective_id}
					objective={item.objective}
					user={user}
					role={role}
					control={control}
					defaultWeightage={item.weightage}
				/>
			))}
		</div>
	);
}

export default ListCard;
