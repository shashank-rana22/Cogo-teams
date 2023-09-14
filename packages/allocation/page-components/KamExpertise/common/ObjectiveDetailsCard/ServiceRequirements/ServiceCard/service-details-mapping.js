import { cl, Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getServiceDetailsMapping = ({ t = () => {} }) => [
	{
		name     : 'inco_terms',
		label    : t('allocation:incoterms_label'),
		accessor : ({ inco_terms }) => {
			if (isEmpty(inco_terms)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						{t('allocation:incoterms_label')}
						:
					</div>

					<div className={styles.value_container}>
						{inco_terms.map((value) => ` ${value.toUpperCase()},`)}
					</div>
				</div>
			);
		},
	},
	{
		name     : 'hs_codes',
		label    : t('allocation:hs_codes_label'),
		accessor : ({ hs_codes }) => {
			if (isEmpty(hs_codes)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						{t('allocation:hs_codes_label')}
						:
					</div>

					<div className={styles.key_value_container}>
						{hs_codes.map((value) => <Pill key={value}>{value}</Pill>)}
					</div>
				</div>
			);
		},
	},
	{
		name     : 'container_details',
		accessor : ({ container_count, weight, volume }) => {
			if (isEmpty(container_count) && isEmpty(weight) && isEmpty(volume)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						{t('allocation:hs_codes_label')}
						:
					</div>

					<div className={styles.key_value_container}>
						{!isEmpty(container_count) && <Pill>{container_count}</Pill>}
						{!isEmpty(weight) && (
							<Pill>
								{weight}
								{' '}
								{t('allocation:unit_kg')}
							</Pill>
						)}
						{!isEmpty(volume) && (
							<Pill>
								{volume}
								{' '}
								{t('allocation:unit_cbm')}
							</Pill>
						)}
					</div>
				</div>
			);
		},
	},
	{
		name     : 'container_size',
		accessor : ({ container_size }) => {
			if (isEmpty(container_size)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						{t('allocation:container_size')}
						:
					</div>

					<div className={styles.key_value_container}>
						{container_size.map((value) => (
							<Pill key={value}>
								{value}
								{' '}
								{t('allocation:unit_ft')}
							</Pill>
						))}
					</div>
				</div>
			);
		},
	},
	{
		name     : 'container_type',
		accessor : ({ container_type }) => {
			if (isEmpty(container_type)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						{t('allocation:container_type')}
						:
					</div>

					<div className={styles.key_value_container}>
						{container_type.map((value) => <Pill key={value}>{startCase(value || '')}</Pill>)}
					</div>
				</div>
			);
		},
	},
	{
		name     : 'truck_type',
		accessor : ({ truck_type }) => {
			if (isEmpty(truck_type)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						{t('allocation:truck_type')}
						:
					</div>

					<div className={styles.key_value_container}>
						{truck_type.map((value) => <Pill key={value}>{startCase(value || '')}</Pill>)}
					</div>
				</div>

			);
		},
	},
	{
		name     : 'trade_lane',
		accessor : ({ origin_location = {}, destination_location = {} }) => {
			if (isEmpty(origin_location) && isEmpty(destination_location)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={cl`${styles.key_value_container} ${styles.origin_location}`}>
						<div className={styles.label}>{t('allocation:trade_lane_origin')}</div>
						<Pill>{origin_location.name}</Pill>
					</div>

					<div className={styles.key_value_container}>
						<div className={styles.label}>{t('allocation:trade_lane_destination')}</div>
						<Pill>{destination_location.name}</Pill>
					</div>
				</div>
			);
		},
	},
];

export default getServiceDetailsMapping;
