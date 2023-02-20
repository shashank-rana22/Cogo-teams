import { Pill, Tooltip } from '@cogoport/components';
import { format, isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

// const CONFIGURATION_DETAILS_MAPPING = [
// 	{
// 		key      : 'schedule_type',
// 		label    : 'Schedule Type',
// 		getValue : (data) => startCase(getByKey(data, 'schedule_type', '___')),
// 		// flex   : '1 1 20%'
// 	},
// 	{
// 		key      : 'days',
// 		label    : 'Repeat On (day)',
// 		getValue : (data) => getByKey(data, 'days', '___'),
// 	},
// 	{
// 		key      : 'stakeholder_type',
// 		label    : 'Stakeholder Type',
// 		getValue : (data) => startCase(getByKey(data, 'stakeholder_type', '___')),
// 	},
// 	{
// 		key      : 'roles',
// 		label    : 'Roles',
// 		getValue : (data) => {
// 			const { role } = data;

// 			return (
// 				<div>
// 					{!isEmpty(role) ? startCase(role[0]?.name) : '___'}
// 					<Tooltip
// 						placement="bottom"
// 						content={(
// 							<div>
// 								{role.map((item) => (
// 									<Pill size="md" color="orange">
// 										{startCase(item.name)}
// 									</Pill>
// 								))}
// 							</div>
// 						)}
// 					>
// 						{role?.length > 1 && (
// 							<strong>
// 								+
// 								{role.length - 1}
// 								more
// 							</strong>
// 						)}
// 					</Tooltip>
// 				</div>
// 			);
// 		},
// 	},
// 	{
// 		key      : 'segment_type',
// 		label    : 'Segment',
// 		getValue : (data) => startCase(data, 'segment_type', '___'),
// 	},
// 	{
// 		key      : 'users',
// 		label    : 'Users',
// 		getValue : (data) => {
// 			const { user } = data;

// 			return (
// 				<div>
// 					{!isEmpty(user) ? startCase(user[0]?.name) : '___'}
// 					<Tooltip
// 						placement="bottom"
// 						content={(
// 							<div>
// 								{user.map((item) => (
// 									<Pill size="md" color="orange">
// 										{startCase(item.name)}
// 									</Pill>
// 								))}
// 							</div>
// 						)}
// 					>
// 						{user?.length > 1 && (
// 							<strong>
// 								+
// 								{user.length - 1}
// 								more
// 							</strong>
// 						)}
// 					</Tooltip>
// 				</div>
// 			);
// 		},
// 	},
// 	{
// 		key      : 'locking_criterion',
// 		label    : 'Locking Criterion',
// 		getValue : (data) => startCase(getByKey(data, 'locking_criterion', '___')),
// 	},
// 	{
// 		key      : 'expiry_date',
// 		label    : 'Expire Date',
// 		getValue : (data) => (data.end_date ? format(data.end_date, 'dd MMM yyyy') : '___'),
// 	},
// 	{
// 		key      : 'locking_period',
// 		label    : 'Locking Period (Days)',
// 		getValue : (data) => getByKey(data, 'locking_period', '___'),
// 	},
// 	{
// 		key      : 'cooling_period',
// 		label    : 'Cooling Period (Days)',
// 		getValue : (data) => getByKey(data, 'cooling_period', '___'),
// 	},
// ];

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
