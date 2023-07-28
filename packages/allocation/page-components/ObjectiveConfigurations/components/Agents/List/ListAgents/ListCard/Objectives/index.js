import { Accordion, Pill } from '@cogoport/components';
import { InputNumberController } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../../../configurations/objective-status-color-mapping';

import ObjectiveDetails from './ObjectiveDetails';
import styles from './styles.module.css';

const MODE_BASIS_MAPPING = {
	view: ({ weightage }) => (
		<p className={styles.set_weightage}>
			Weightage:
			{' '}
			<strong>
				{weightage}
				%
			</strong>
		</p>
	),
	edit: ({ id, weightage, control }) => (
		<>
			<p className={styles.set_weightage}>Set Weightage (%)</p>
			<InputNumberController
				name={`${id}_weightage`}
				size="sm"
				control={control}
				value={weightage}
				suffix={(
					<IcMTick
						height={20}
						width={20}
						style={{ marginRight: '12px' }}
					/>
				)}
			/>
		</>
	),
};

function Objectives(props) {
	const { objectives, mode, control } = props;

	return (
		<>
			{objectives.map((item) => {
				const { weightage = '', objective = {} } = item;

				return (
					<Accordion
						key={objective.id}
						className={styles.accordian}
						type="text"
						title={(
							<div className={styles.accordian_title}>
								<div className={styles.title_left_container}>
									<div>{objective.name}</div>
									<Pill>{startCase(objective.objective_type)}</Pill>
									<Pill color={OBJECTIVE_STATUS_COLOR_MAPPING[objective.lead_objective_status]}>
										{startCase(objective.lead_objective_status)}
									</Pill>
								</div>

								<div className={styles.title_right_container}>
									{MODE_BASIS_MAPPING[mode]({ id: objective.id, weightage, control })}
								</div>
							</div>
						)}
					>
						<ObjectiveDetails activeObjectiveId={objective.id} />
					</Accordion>
				);
			})}
		</>
	);
}

export default Objectives;
