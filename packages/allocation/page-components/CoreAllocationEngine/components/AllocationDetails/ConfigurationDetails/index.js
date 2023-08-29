import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format, isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function ConfigurationDetails({ configurationDetails = {} }) {
	const { t } = useTranslation(['allocation']);

	return (
		<div className={styles.main_card}>
			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:schedule_type')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.schedule_type)
					|| t('allocation:not_available')}
					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:repeat_on_day')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.days)
					|| t('allocation:not_available')}

					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:stakeholder_type_label')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.stakeholder_type)
					|| t('allocation:not_available')}
					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:role_ids_label')}</div>
					<div className={styles.value}>
						{!isEmpty(configurationDetails.role)
							? startCase(configurationDetails.role[GLOBAL_CONSTANTS.zeroth_index]?.name)
							: t('allocation:not_available')}
						<Tooltip
							placement="bottom"
							content={(
								<div>
									{configurationDetails.role?.map((item) => (
										<Pill key={item?.name} size="md" color="orange">
											{startCase(item.name)}
										</Pill>
									))}
								</div>
							)}
						>
							{configurationDetails.role?.length > FIRST_INDEX && (
								<strong>
									+
									{configurationDetails.role.length - FIRST_INDEX}
									{t('allocation:more_label')}
								</strong>
							)}
						</Tooltip>
					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:segments')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.segment_type)
					|| t('allocation:not_available')}

					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:users_label')}</div>
					<div className={styles.value}>
						{!isEmpty(configurationDetails.user)
							? startCase(configurationDetails.user[GLOBAL_CONSTANTS.zeroth_index]?.name)
							: t('allocation:not_available')}
						<Tooltip
							placement="bottom"
							content={(
								<div>
									{configurationDetails.user?.map((item) => (
										<Pill key={item.name} size="md" color="orange">
											{startCase(item.name)}
										</Pill>
									))}
								</div>
							)}
						>
							{configurationDetails.user?.length > FIRST_INDEX && (
								<strong>
									+
									{configurationDetails.user.length - FIRST_INDEX}
									{t('allocation:more_label')}
								</strong>
							)}
						</Tooltip>
					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:locking_criterion_label')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.locking_criterion)
					|| t('allocation:not_available')}
					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:expiry_date_label')}</div>
					<div className={styles.value}>
						{configurationDetails.end_date ? format(configurationDetails.end_date, 'dd MMM yyyy')
							: t('allocation:not_available')}
					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:locking_period_label')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.locking_period)
					|| t('allocation:not_available')}

					</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>{t('allocation:cooling_period_label')}</div>
					<div className={styles.value}>
						{startCase(configurationDetails.cooling_period)
					|| t('allocation:not_available')}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfigurationDetails;
