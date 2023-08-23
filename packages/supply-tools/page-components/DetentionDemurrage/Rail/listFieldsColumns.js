import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const listFieldsColumns = [
	{
		label  : 'Locations',
		key    : 'location',
		span   : 2.2,
		render : (item) => (
			<div className={styles.wrap_text}>{item?.location?.display_name || item?.location?.name || '-'}</div>
		),
	},
	{
		label  : 'Container',
		key    : 'container',
		span   : 1.5,
		render : (item) => (
			<div className={styles.wrap_text}>
				{item?.container_size || '-'}
				{' '}
				ft -
				{' '}
				{item?.container_type || '-'}
			</div>
		),
	},
	{
		label  : 'Service Provider',
		key    : 'service_provider',
		name   : 'service_provider',
		span   : 1.5,
		render : (item) => (
			<div className={styles.wrap_text}>{item?.service_provider?.business_name || '-'}</div>
		),
	},
	{
		label  : 'Trade Type',
		key    : 'trade_type',
		name   : 'trade_type',
		span   : 0.8,
		render : (item) => (
			<div className={styles.wrap_text}>{startCase(item?.trade_type) || '-'}</div>
		),
	},

	{
		label  : 'Commodity',
		key    : 'commodity',
		name   : 'commodity',
		span   : 1.5,
		render : (item) => (
			<div className={styles.wrap_text}>{item?.commodity || '-'}</div>
		),
	},
	{
		label  : 'Container Limit',
		key    : 'container_limit',
		name   : 'container_limit',
		span   : 1,
		render : (item) => (
			<div className={styles.wrap_text}>
				{`${item?.containers_count_lower_limit || ''} - ${
					item?.containers_count_upper_limit || ''
				}`}
			</div>
		),
	},
	{
		label  : 'Type',
		key    : 'type',
		name   : 'type',
		span   : 1,
		render : (item) => (
			<div className={styles.wrap_text}>{startCase(item?.specificity_type) || '-'}</div>
		),
	},
	{
		label  : 'Free Days type',
		key    : 'free_days_type',
		name   : 'free_days_type',
		span   : 1,
		render : (item) => (
			<div className={styles.wrap_text}>{startCase(item?.free_days_type) || '-'}</div>
		),
	},
	{
		label  : 'Free Limit',
		key    : 'free_limit',
		name   : 'free_limit',
		span   : 1,
		render : (item) => (
			<div className={styles.wrap_text}>
				{item?.free_limit || '-'}
				{' '}
				Days
			</div>
		),
	},
];

export default listFieldsColumns;
