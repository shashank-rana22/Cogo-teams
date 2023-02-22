import { Pill, Tooltip } from '@cogoport/components';
import { format, isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ConfigurationDetails({ configurationDetails = {} }) {
	return (
		<div className={styles.main_card}>
			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>Schedule Type</div>
					<div className={styles.value}>{startCase(configurationDetails.schedule_type) || 'NA'}</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>Repeat On (day)</div>
					<div className={styles.value}>{startCase(configurationDetails.days) || 'NA'}</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>Stakeholder Type</div>
					<div className={styles.value}>{startCase(configurationDetails.stakeholder_type) || 'NA'}</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>Roles</div>
					<div className={styles.value}>
						{!isEmpty(configurationDetails.role) ? startCase(configurationDetails.role[0]?.name) : 'NA'}
						<Tooltip
							placement="bottom"
							content={(
								<div>
									{configurationDetails.role?.map((item) => (
										<Pill size="md" color="orange">
											{startCase(item.name)}
										</Pill>
									))}
								</div>
							)}
						>
							{configurationDetails.role?.length > 1 && (
								<strong>
									+
									{configurationDetails.role.length - 1}
									more
								</strong>
							)}
						</Tooltip>
					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>Segment</div>
					<div className={styles.value}>{startCase(configurationDetails.segment_type) || 'NA'}</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>Users</div>
					<div className={styles.value}>
						{!isEmpty(configurationDetails.user) ? startCase(configurationDetails.user[0]?.name) : 'NA'}
						<Tooltip
							placement="bottom"
							content={(
								<div>
									{configurationDetails.user?.map((item) => (
										<Pill size="md" color="orange">
											{startCase(item.name)}
										</Pill>
									))}
								</div>
							)}
						>
							{configurationDetails.user?.length > 1 && (
								<strong>
									+
									{configurationDetails.user.length - 1}
									more
								</strong>
							)}
						</Tooltip>
					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>Locking Criterion</div>
					<div className={styles.value}>{startCase(configurationDetails.locking_criterion) || 'NA'}</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>Expire Date</div>
					<div className={styles.value}>
						{configurationDetails.end_date ? format(configurationDetails.end_date, 'dd MMM yyyy') : 'NA'}
					</div>
				</div>
			</div>

			<div className={styles.column_container}>
				<div className={styles.item_container}>
					<div className={styles.label}>Locking Period (Days)</div>
					<div className={styles.value}>{startCase(configurationDetails.locking_period) || 'NA'}</div>
				</div>
				<div className={styles.item_container}>
					<div className={styles.label}>Cooling Period (Days)</div>
					<div className={styles.value}>{startCase(configurationDetails.cooling_period) || 'NA'}</div>
				</div>
			</div>
		</div>
	);
}

export default ConfigurationDetails;
