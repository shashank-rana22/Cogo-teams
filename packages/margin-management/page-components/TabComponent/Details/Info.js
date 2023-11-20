import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Info({ data = {} }) {
	const { margin_applied_on = '' } = data || {};

	const {
		location,
		origin_location,
		destination_location,
		shipping_line,
		airline,
		commodity,
		container_type,
		container_size,
	} = data?.filters || {};

	const origin = () => {
		if (!isEmpty(location)) {
			return location?.display_name;
		}
		if (!isEmpty(origin_location)) {
			return origin_location?.name;
		}
		return null;
	};

	// const margin_type = () => {
	// 	if (data?.margin_type === 'demand') {
	// 		return 'sales';
	// 	}
	// 	return data?.margin_type;
	// };

	return (
		<div style={{ display: 'flex', gap: '4px' }}>
			{origin() ? (
				<div className={styles.pill}>{origin() && `Origin: ${origin()}`}</div>
			) : null}

			{destination_location?.name ? (
				<div className={styles.pill}>
					{destination_location?.name && `Destination: ${destination_location?.name}`}
				</div>
			) : null}

			{margin_applied_on ? (
				<div className={styles.pill}>
					{startCase(margin_applied_on)}
				</div>
			) : null}

			{data?.organization?.business_name ? (
				<div className={styles.pill}>
					{data?.organization?.business_name}
				</div>
			) : null}

			{shipping_line ? (
				<div className={styles.pill}>
					{shipping_line?.business_name}
				</div>
			) : null}

			{airline ? (
				<div className={styles.pill}>
					{airline?.business_name}
				</div>
			) : null}

			{container_size ? (
				<div className={styles.pill}>
					{startCase(container_size)}
				</div>
			) : null}

			{container_type ? (
				<div className={styles.pill}>
					{startCase(container_type)}
				</div>
			) : null}

			{commodity ? (
				<div className={styles.pill}>
					{startCase(commodity)}
				</div>
			) : null}
		</div>
	);
}

export default Info;
