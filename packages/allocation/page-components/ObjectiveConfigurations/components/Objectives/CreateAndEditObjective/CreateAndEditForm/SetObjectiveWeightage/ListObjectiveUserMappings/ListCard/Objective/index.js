import { Accordion, Pill, cl } from '@cogoport/components';
import { InputNumberController } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ObjectiveDetailsCard from '../../../../../../../../common/ObjectiveDetailsCard';
import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../../../../../configurations/objective-status-color-mapping';

import styles from './styles.module.css';

function Objective(props) {
	const { currentObjective = false, formValues = {}, objective, user, role, control, defaultWeightage } = props;

	const { id, name, objective_type, status } = objective || {};

	const { id: userId } = user || {};

	return (
		<Accordion
			type="text"
			className={currentObjective ? cl`${styles.accordian} ${styles.current_objective}` : styles.accordian}
			title={(
				<div className={styles.accordian_title}>
					<div className={styles.title_left_container}>
						<div className={currentObjective && styles.current_name}>{name}</div>
						<Pill color="blue">
							{startCase(objective_type)}
							{' '}
							Objective
						</Pill>
						<Pill color={OBJECTIVE_STATUS_COLOR_MAPPING[status]}>
							{startCase(status)}
						</Pill>
					</div>

					<div className={styles.title_right_container}>
						<p className={styles.set_weightage}>Set Weightage (%)</p>
						<InputNumberController
							name={`${id || ''}_${userId}_${role?.id}_weightage`}
							size="sm"
							control={control}
							value={defaultWeightage}
							suffix={(
								<IcMTick
									height={20}
									width={20}
									style={{ marginRight: '12px' }}
								/>
							)}
						/>
					</div>
				</div>
			)}
		>
			{currentObjective && <ObjectiveDetailsCard objectiveData={formValues.objectiveRequirements} />}
		</Accordion>
	);
}

export default Objective;
