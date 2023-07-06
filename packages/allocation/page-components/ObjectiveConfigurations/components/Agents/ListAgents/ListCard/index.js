import { Accordion, Button, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import ObjectiveDetailsCard from '../../../../common/ObjectiveDetailsCard';
import OBJECTIVE_STATUS_COLOR_MAPPING from '../../../../configurations/objective-status-color-mapping';
import TAB_PANNEL_KEYS from '../../../../constants/tab-pannel-keys-mapping';

import styles from './styles.module.css';

function ListCard(props) {
	const { item, setActiveTabDetails } = props;

	const { OBJECTIVES } = TAB_PANNEL_KEYS;

	const { role, user, partner, objectives } = item;

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

					<Pill size="md">
						Channel:
						{' '}
						{role.role_sub_function}
					</Pill>
				</div>

				<Button type="button" themeType="secondary">Edit Distribution</Button>
			</div>

			{objectives.map((objective) => (
				<Accordion
					key={item.id}
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

			<div
				className={styles.create_new}
				role="presentation"
				onClick={() => setActiveTabDetails((pv) => ({
					...pv,
					tab  : OBJECTIVES,
					mode : 'create',
					id   : undefined,
				}))}
			>
				+ Create New Objective For Agent
			</div>
		</div>
	);
}

export default ListCard;
