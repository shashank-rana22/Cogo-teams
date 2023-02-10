import { Pill, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ConfigurationCard({
	preferenceData = {},
}) {
	const {
		roles = [],
		stakeholder_type = '',
		locking_criterion = '',
	} = preferenceData;

	return (
		<div className={styles.configuration_card}>
			<div className={`${styles.field_container} ${styles.first_element}`}>
				<div className={styles.label}>Locking Criterion:</div>
				<div className={styles.value}>{startCase(locking_criterion)}</div>
			</div>

			<div className={styles.field_container}>
				<div className={styles.label}>Stakeholder Type:</div>
				<div className={styles.value}>{startCase(stakeholder_type)}</div>
			</div>

			<div className={styles.field_container}>
				<div className={styles.label}>Roles:</div>
				<div className={styles.value}>
					{startCase(roles[0]?.name)}
					<Tooltip
						placement="bottom"
						content={
						roles.map((role) => (
							<Pill size="md" color="orange">
								{startCase(role.name)}
							</Pill>
						))
					}
					>
						{roles.length > 1 && (
							<strong>
								(+
								{roles.length - 1}
								)
							</strong>
						)}
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default ConfigurationCard;
