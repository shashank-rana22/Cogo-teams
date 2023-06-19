import { Pill, Tooltip } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';

import { USER_TYPE_COLOR_MAPPING, USER_TYPE_MAPPING } from '../../../../constants';

import styles from './styles.module.css';

const EARNED_VALUE = 0;

function tableColumns({ currencyCode = '', activeStatsCard = '', activeHeaderTab = '' }) {
	const columns = [
		{
			Header   : 'Name',
			accessor : (item = {}) => (
				<Tooltip
					content={startCase(getByKey(item, 'user_name'))}
					placement="bottom"
				>
					<div className={styles.user_name}>
						{startCase(getByKey(item, 'user_name'))}
					</div>

				</Tooltip>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
		},
		{
			Header   : 'Organisation Name',
			accessor : (item = {}) => (
				<Tooltip
					content={startCase(getByKey(item, 'organization_name'))}
					placement="bottom"
				>
					<div className={styles.user_name}>
						{startCase(getByKey(item, 'organization_name')) || '--'}
					</div>
				</Tooltip>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner'],
		},
		{
			Header   : 'User Type',
			accessor : (item = {}) => (
				<Pill size="md" color={USER_TYPE_COLOR_MAPPING[item?.organization_type]} className={styles.user_type}>
					{startCase(USER_TYPE_MAPPING[item?.organization_type])}
				</Pill>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value', 'cogostore_burnt_point_value',
			],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
		},
		{
			Header   : `Total (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{item?.total_value || EARNED_VALUE}
				</div>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value', 'cogostore_burnt_point_value',
			],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
		},
		{
			Header   : `Shipment (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.shipment_point_value || EARNED_VALUE}
				</div>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value'],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner'],
		},
		{
			Header   : `Subscription (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.saas_subscription_point_value || EARNED_VALUE}
				</div>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'saas_subscription_burnt_point_value'],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner'],
		},
		{
			Header   : `Referral (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.referral_point_value || EARNED_VALUE}
				</div>
			),
			conditions    : ['liability_point_value'],
			headerOptions : ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
		},
		{
			Header   : `One Time (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{(item?.one_time_point_value || EARNED_VALUE) + (item?.milestone_point_value || EARNED_VALUE)}
				</div>
			),
			conditions    : ['liability_point_value'],
			headerOptions : ['overall', 'importer_exporter', 'channel_partner'],
		},
		{
			Header   : `Cogostore (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.cogostore_point_value || EARNED_VALUE}
				</div>
			),
			conditions: ['total_burnt_point_value',
				'cogostore_burnt_point_value'],
			headerOptions: ['overall', 'importer_exporter', 'channel_partner', 'affiliate'],
		},
	];
	return columns.filter((item) => item.headerOptions.includes(activeHeaderTab)
	&& item.conditions.includes(activeStatsCard));
}

export default tableColumns;
