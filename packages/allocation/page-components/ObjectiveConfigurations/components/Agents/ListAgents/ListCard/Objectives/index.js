import { Accordion, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import ObjectiveDetailsCard from '../../../../../common/ObjectiveDetailsCard';
import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../../configurations/objective-status-color-mapping';

import styles from './styles.module.css';

function Objectives(props) {
	const { objectives } = props;

	return (
		<>
			{objectives.map((objective) => (
				<Accordion
					key={objective.id}
					className={styles.accordian}
					type="text"
					title={(
						<div className={styles.accordian_title}>
							<div>{objective.name}</div>
							<Pill>{startCase(objective.type)}</Pill>
							<Pill
								color={OBJECTIVE_STATUS_COLOR_MAPPING[objective.status]}
							>
								{startCase(objective.status)}
							</Pill>
						</div>
					)}
				>
					<ObjectiveDetailsCard activeObjectiveId={objective.id} />
				</Accordion>
			))}
		</>
	);
}

export default Objectives;
