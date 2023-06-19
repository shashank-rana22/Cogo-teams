import { Pill, Tooltip } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';

import {
	NAME_STATS_OPTIONS,
	NAME_TAB_OPTIONS,
	ORGANISATION_TAB_OPTION,
	ORGANISATION_STATS_OPTION,
	USER_TYPE_STATS_OPTIONS,
	USER_TYPE_TAB_OPTIONS,
	USER_TYPE_MAPPING,
	COGOSTORE_TAB_OPTIOINS,
	COGOSTORE_STATS_OPTIONS,
	ONE_TIME_STATS_OPTIONS,
	REFERRAL_TAB_OPTIONS,
	REFERRAL_STATS_OPTIONS,
	COMMON_TAB_OPTIONS,
	SHIPMENT_STATS_OPTIONS,
	SUBSCRIPTION_STAT_OPTIONS,
	TOTAL_STATS_OPTIONS,
	TOTAL_TAB_OPTIONS,
} from '../../../../constants';

import styles from './styles.module.css';

const EARNED_VALUE = 0;

function getTableColumns({ currencyCode = '', activeStatsCard = '', activeHeaderTab = '' }) {
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
			statsOptions : NAME_STATS_OPTIONS,
			tabOptions   : NAME_TAB_OPTIONS,
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
			statsOptions : ORGANISATION_STATS_OPTION,
			tabOptions   : ORGANISATION_TAB_OPTION,
		},
		{
			Header   : 'User Type',
			accessor : (item = {}) => (
				<Pill size="md" color={USER_TYPE_MAPPING[item?.organization_type]?.color} className={styles.user_type}>
					{startCase(USER_TYPE_MAPPING[item?.organization_type]?.name)}
				</Pill>
			),
			statsOptions : USER_TYPE_STATS_OPTIONS,
			tabOptions   : USER_TYPE_TAB_OPTIONS,
		},
		{
			Header   : `Total (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{item?.total_value || EARNED_VALUE}
				</div>
			),
			statsOptions : TOTAL_STATS_OPTIONS,
			tabOptions   : TOTAL_TAB_OPTIONS,
		},
		{
			Header   : `Shipment (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.shipment_point_value || EARNED_VALUE}
				</div>
			),
			statsOptions : SHIPMENT_STATS_OPTIONS,
			tabOptions   : COMMON_TAB_OPTIONS,
		},
		{
			Header   : `Subscription (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.saas_subscription_point_value || EARNED_VALUE}
				</div>
			),
			statsOptions : SUBSCRIPTION_STAT_OPTIONS,
			tabOptions   : COMMON_TAB_OPTIONS,
		},
		{
			Header   : `Referral (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.referral_point_value || EARNED_VALUE}
				</div>
			),
			statsOptions : REFERRAL_STATS_OPTIONS,
			tabOptions   : REFERRAL_TAB_OPTIONS,
		},
		{
			Header   : `One Time (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{(item?.one_time_point_value || EARNED_VALUE) + (item?.milestone_point_value || EARNED_VALUE)}
				</div>
			),
			statsOptions : ONE_TIME_STATS_OPTIONS,
			tabOptions   : COMMON_TAB_OPTIONS,
		},
		{
			Header   : `Cogostore (${currencyCode})`,
			accessor : (item = {}) => (
				<div className={styles.earned_value}>
					{item?.cogostore_point_value || EARNED_VALUE}
				</div>
			),
			statsOptions : COGOSTORE_STATS_OPTIONS,
			tabOptions   : COGOSTORE_TAB_OPTIOINS,
		},
	];

	return columns.filter((item) => item.tabOptions.includes(activeHeaderTab)
	&& item.statsOptions.includes(activeStatsCard));
}

export default getTableColumns;
