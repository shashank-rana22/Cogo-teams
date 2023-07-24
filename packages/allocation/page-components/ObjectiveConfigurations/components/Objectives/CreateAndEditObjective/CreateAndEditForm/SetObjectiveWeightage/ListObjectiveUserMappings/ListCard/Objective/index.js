import { Accordion, Pill } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../../../../../configurations/objective-status-color-mapping';

import styles from './styles.module.css';

function Objective(props) {
	const { objective, user, control, defaultWeightage } = props;

	const { id, name, objective_type, status } = objective || {};

	const { id: userId } = user || {};

	return (
		<Accordion
			type="text"
			className={styles.accordian}
			title={(
				<div className={styles.accordian_title}>
					<div className={styles.title_left_container}>
						<div>{name}</div>
						<Pill>{startCase(objective_type)}</Pill>
						<Pill color={OBJECTIVE_STATUS_COLOR_MAPPING[status]}>
							{startCase(status)}
						</Pill>
					</div>

					<div className={styles.title_right_container}>
						<p className={styles.set_weightage}>Set Weightage (%)</p>
						<InputController
							name={`${id}_${userId}_weightage`}
							size="sm"
							control={control}
							defaultValue={defaultWeightage}
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
			Hello
		</Accordion>
	);
}

export default Objective;
