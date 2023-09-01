import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function ConfigurationCard({
	preferenceData = {},
}) {
	const { t } = useTranslation(['allocation']);

	const {
		roles = [],
		stakeholder_type = '',
		locking_criterion = '',
	} = preferenceData;

	return (
		<div className={styles.configuration_card}>
			<div className={`${styles.field_container} ${styles.first_element}`}>
				<div className={styles.label}>
					{t('allocation:locking_criterion_label')}
					:
				</div>
				<div className={styles.value}>{startCase(locking_criterion)}</div>
			</div>

			<div className={styles.field_container}>
				<div className={styles.label}>
					{t('allocation:stakeholder_type_label')}
					:
				</div>
				<div className={styles.value}>{startCase(stakeholder_type)}</div>
			</div>

			<div className={styles.field_container}>
				<div className={styles.label}>
					{t('allocation:role_ids_label')}
					:
				</div>
				<div className={styles.value}>
					{startCase(roles[GLOBAL_CONSTANTS.zeroth_index]?.name)}
					<Tooltip
						placement="bottom"
						content={
						roles.map((role) => (
							<Pill key={role?.name} size="md" color="orange">
								{startCase(role.name)}
							</Pill>
						))
					}
					>
						{roles.length > FIRST_INDEX && (
							<strong>
								(+
								{roles.length - FIRST_INDEX}
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
