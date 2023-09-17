import { Pill } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Info({ data = {} }) {
	const {
		location = {},
		origin_location = {},
		destination_location = {},
		trade_type = '',
		rate_type = '',
	} = data?.filters || {};
	const origin = () => {
		if (!isEmpty(location)) {
			return location?.display_name;
		}
		if (!isEmpty(origin_location)) {
			return origin_location?.display_name;
		}
		return null;
	};
	const marginType = () => {
		if (data?.margin_type === 'demand') {
			return 'sales';
		}
		return data?.margin_type;
	};
	return (
		<div>
			<div className={styles.flex}>
				<Pill size="md" color="yellow">{startCase(data?.service)}</Pill>
				{trade_type ? <Pill>{startCase(trade_type)}</Pill> : null}
			</div>
			<div className={styles.flex}>
				{origin()?.display_name ? (
					<Pill>{origin()?.display_name}</Pill>
				) : null}
				{destination_location?.display_name ? (
					<Pill>{destination_location?.display_name}</Pill>
				) : null}
			</div>

			<div className={styles.flex}>
				<div>Margin Type</div>
				<Pill>{marginType()}</Pill>
			</div>
			<div className={styles.flex}>
				<div>Rate Type</div>
				<Pill>{rate_type ? startCase(rate_type) : 'Marketplace Rate'}</Pill>
			</div>
		</div>
	);
}
export default Info;
