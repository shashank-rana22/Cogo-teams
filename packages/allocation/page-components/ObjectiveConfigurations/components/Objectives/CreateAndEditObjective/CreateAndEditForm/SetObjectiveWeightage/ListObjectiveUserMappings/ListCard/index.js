import { Pill, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import ObjectiveAccordian from '../ObjectiveAccordian';

import styles from './styles.module.css';

const DEFAULT_WEIGHTAGE = 100;
const DECIMAL_COUNT = 2;
const CURRENT_OBJECTIVE_COUNT = 1;

function ListCard(props) {
	const { objectiveUserMappingData, control, setValue, formValues } = props;

	const {
		user = {},
		role = {},
		objectives = [],
	} = objectiveUserMappingData || {};

	const { generalConfiguration: { partner = {} } = {} } = formValues;

	const onDistributeEqually = () => {
		if (isEmpty(objectives)) return;

		const objectivesCount = objectives.length + CURRENT_OBJECTIVE_COUNT;
		const equalWeight = (DEFAULT_WEIGHTAGE / objectivesCount).toFixed(DECIMAL_COUNT);
		let lastWeightage = 100.00;

		objectives.forEach((item) => {
			const { objective_id = '' } = item;

			setValue(`${objective_id}_${user?.id}_${role?.id}_weightage`, equalWeight);

			lastWeightage -= equalWeight;
		});

		setValue(`undefined_${user?.id}_${role?.id}_weightage`, lastWeightage.toFixed(DECIMAL_COUNT));
	};

	return (
		<div className={styles.card_container}>
			<div className={styles.card_header}>
				<div className={styles.agent_detail}>
					<p className={styles.agent}>
						{role?.name}
						:
						{' '}
						<strong>{user?.name}</strong>
					</p>

					<Pill size="md">
						Entity:
						{' '}
						{partner?.business_name}
					</Pill>

					{/* <Pill size="md">
						Channel:
						{' '}
						{role.role_sub_function}
					</Pill> */}
				</div>

				<Button
					size="md"
					type="button"
					themeType="secondary"
					onClick={() => onDistributeEqually()}
				>
					Equally Distribute Weightage
				</Button>
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
