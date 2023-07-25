import { cl, Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const CARD_DATA_MAPPING = [
	{
		name     : 'inco_term',
		label    : 'Incoterm',
		accessor : ({ inco_term }) => {
			if (isEmpty(inco_term)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						Incoterm:
					</div>

					<div className={styles.value_container}>
						{inco_term.map((value) => ` ${value.toUpperCase()},`)}
					</div>
				</div>
			);
		},
	},
	{
		name     : 'hs_codes',
		label    : 'Commodity Codes',
		accessor : ({ hs_codes }) => {
			if (isEmpty(hs_codes)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						Commodity Codes:
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
		accessor : ({ container_count, cargo_weight, volume }) => {
			if (isEmpty(container_count) && isEmpty(cargo_weight) && isEmpty(volume)) return null;

			return (
				<div className={styles.key_value_container}>
					<div className={styles.label}>
						Container Details:
					</div>

					<div className={styles.key_value_container}>
						{container_count && <Pill>{container_count}</Pill>}
						{cargo_weight && (
							<Pill>
								{cargo_weight}
								{' '}
								Kg
							</Pill>
						)}
						{volume && (
							<Pill>
								{volume}
								{' '}
								CBM
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
						Container Size:
					</div>

					<div className={styles.key_value_container}>
						{container_size.map((value) => (
							<Pill key={value}>
								{value}
								{' '}
								ft
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
						Container Type:
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
						Truck Type:
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
						<div className={styles.label}>Origin:</div>
						<Pill>{origin_location.name}</Pill>
					</div>

					<div className={styles.key_value_container}>
						<div className={styles.label}>Destination:</div>
						<Pill>{destination_location.name}</Pill>
					</div>
				</div>
			);
		},
	},
];

export default CARD_DATA_MAPPING;
