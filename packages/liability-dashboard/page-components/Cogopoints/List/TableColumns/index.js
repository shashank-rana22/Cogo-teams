import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const EARNED_VALUE = 0;

const USER_TYPE_COLOR_MAPPING = {
	channel_partner   : '#c4dc91',
	importer_exporter : '#fef199',
	affiliate         : '#f8aea8',
};

const USER_TYPE_MAPPING = {
	channel_partner   : 'CP',
	importer_exporter : '#IE',
	affiliate         : 'Affiliate',
};

function TableColumns() {
	const columns = [
		{
			Header   : 'Name',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{startCase(item?.user_name)}
				</div>
			),
		},
		{
			Header   : 'Organisation Name',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{startCase(item?.organization_name)}
				</div>
			),
		},
		{
			Header   : 'User Type',
			accessor : (item = {}) => (
				<Pill size="md" color={USER_TYPE_COLOR_MAPPING[item?.organization_type]} className={styles.user_type}>
					{startCase(USER_TYPE_MAPPING[item?.organization_type])}
				</Pill>
			),
		},
		{
			Header   : 'TOTAL',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{item?.total_value || EARNED_VALUE}
				</div>
			),
		},
		{
			Header   : 'Shipments',
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{startCase(item?.shipment_point_value) || EARNED_VALUE}
				</div>
			),
		},
		{
			Header   : 'Subscriptions',
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{startCase(item?.saas_subscription_point_value) || EARNED_VALUE}
				</div>
			),
		},
		{
			Header   : 'Referrals',
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{startCase(item?.referral_point_value) || EARNED_VALUE}
				</div>
			),
		},
	];

	return columns;
}

export default TableColumns;
