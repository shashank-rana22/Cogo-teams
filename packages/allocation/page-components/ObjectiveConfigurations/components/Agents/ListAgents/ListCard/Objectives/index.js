import { Accordion, Pill } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../../configurations/objective-status-color-mapping';

import ObjectiveDetails from './ObjectiveDetails';
import styles from './styles.module.css';

function Objectives(props) {
	const { objectives, mode, control } = props;

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
		edit: ({ id, weightage }) => (
			<>
				<p className={styles.set_weightage}>Set Weightage (%)</p>
				<InputController
					name={`${id}_weightage`}
					size="sm"
					control={control}
					defaultValue={weightage}
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

	return (
		<>
			{objectives.map((objective) => (
				<Accordion
					key={objective.id}
					className={styles.accordian}
					type="text"
					title={(
						<div className={styles.accordian_title}>
							<div className={styles.title_left_container}>
								<div>{objective.name}</div>
								<Pill>{startCase(objective.objective_type)}</Pill>
								<Pill color={OBJECTIVE_STATUS_COLOR_MAPPING[objective.status]}>
									{startCase(objective.status)}
								</Pill>
							</div>

							<div className={styles.title_right_container}>
								{MODE_BASIS_MAPPING[mode](objective)}
							</div>
						</div>
					)}
				>
					<ObjectiveDetails activeObjectiveId={objective.id} />
				</Accordion>
			))}
		</>
	);
}

export default Objectives;
