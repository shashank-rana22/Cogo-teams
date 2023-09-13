import { Pill, Button } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Details({ data = {}, setMarginBreakupData = () => {} }) {
	const { service = '', margin_type = '', margin_slabs_currency = '', filters = {}, partner = {} } = data || {};
	const {
		commodity,
		container_type,
		container_size,
		location,
		origin_location,
		destination_location,
		trade_type,
	} = filters || {};
	const { business_name } = partner || {};
	const origin = () => {
		if (!isEmpty(location)) {
			return location?.display_name;
		}
		if (!isEmpty(origin_location)) {
			return origin_location?.display_name;
		}
		return null;
	};
	const setData = () => {
		setMarginBreakupData(data);
	};
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.flex}>
					<Pill size="lg" color="yellow">{startCase(service)}</Pill>
					<div className={styles.origin_destination}>
						{origin() && (
							<Pill size="lg" color="yellow">{origin()}</Pill>
						) }
						{destination_location?.display_name && (
							<Pill size="lg" color="yellow">{destination_location?.display_name}</Pill>
						) }
					</div>
				</div>

				<div className={styles.flex}>
					{trade_type && <Pill size="lg">{startCase(trade_type)}</Pill>}
					<div style={{ marginLeft: '10px' }}>{data?.organization?.business_name}</div>
				</div>
				<div className={styles.flex}>
					{data?.partner?.business_name && (
						<Pill size="lg" color="blue">
							Partner Entity:
							{' '}
							{startCase(business_name)}
						</Pill>
					)}
					{data?.margin_type && (
						<Pill size="lg" color="blue">
							Margin Type:
							{' '}
							{startCase(margin_type)}
						</Pill>
					)}
					{data?.margin_slabs_currency && (
						<Pill size="lg" color="blue">
							Margin Currency:
							{' '}
							{startCase(margin_slabs_currency)}
						</Pill>
					)}
				</div>
				<div className={styles.flex}>
					{container_size && (
						<Pill size="lg">
							Container Size:
							{' '}
							{startCase(container_size)}
						</Pill>
					) }
					{container_type && (
						<Pill size="lg">
							Container Type:
							{' '}
							{startCase(container_type)}
						</Pill>
					) }
					{commodity && (
						<Pill size="lg">
							Commodity:
							{' '}
							{startCase(commodity)}
						</Pill>
					) }
				</div>
				{data?.agent?.name ? (
					<div style={{ marginTop: '8px', marginLeft: '10px' }}>
						{`Agent: ${data?.agent?.name} ${data?.agent?.email ? `(${data?.agent?.email})` : ''
						}`}
					</div>
				) : null}

			</div>
			<Button
				onClick={setData}
			>
				View details
			</Button>

		</div>

	);
}
export default Details;
