import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { USER_TYPE_COLOR_MAPPING, USER_TYPE_MAPPING } from '../../../../constants';

import styles from './styles.module.css';

const EARNED_VALUE = 0;

function TableColumns({ currencyCode = '', activeStatsCard = '' }) {
	const columns = [
		{
			Header   : 'Name',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{startCase(item?.user_name)}
				</div>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
		},
		{
			Header   : 'Organisation Name',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{startCase(item?.organization_name)}
				</div>
			),
			conditions: ['liability_point_value',
				'total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
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
				'saas_subscription_burnt_point_value', 'cogostore_burnt_point_value'],
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
				'saas_subscription_burnt_point_value', 'cogostore_burnt_point_value'],
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
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
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
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
		},
		{
			Header   : `Referral (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.referral_point_value || EARNED_VALUE}
				</div>
			),
			conditions: ['liability_point_value'],
		},
		{
			Header   : `One Time (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.one_time_point_value || EARNED_VALUE}
				</div>
			),
			conditions: ['liability_point_value'],
		},
		{
			Header   : `Cogostore (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.cogostore_point_value || EARNED_VALUE}
				</div>
			),
			conditions: ['total_burnt_point_value',
				'shipment_burnt_point_value',
				'saas_subscription_burnt_point_value',
				'cogostore_burnt_point_value'],
		},
	];
	return columns.filter((item) => item.conditions.includes(activeStatsCard));
}

export default TableColumns;
