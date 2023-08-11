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

				const { id, name, objective_type, lead_objective_status, status } = objective || {};

				const showStatus = status === 'live' ? status : lead_objective_status;

				return (
					<Accordion
						key={id}
						className={styles.accordian}
						type="text"
						title={(
							<div className={styles.accordian_title}>
								<div className={styles.title_left_container}>
									<div>{name}</div>
									<Pill>{startCase(objective_type)}</Pill>
									<Pill color={OBJECTIVE_STATUS_COLOR_MAPPING[showStatus]}>
										{startCase(showStatus)}
									</Pill>
								</div>

								<div className={styles.title_right_container}>
									{MODE_BASIS_MAPPING[mode]({ id, weightage, control })}
								</div>
							</div>
						)}
					>
						<ObjectiveDetails activeObjectiveId={id} />
					</Accordion>
				);
			})}
		</>
	);
}

export default Objectives;
