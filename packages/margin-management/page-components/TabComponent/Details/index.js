import { Pill, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import getOriginMarginType from '../../../helpers/getOriginMarginType';

import styles from './styles.module.css';

function Details({ data = {}, setMarginBreakupData = () => {}, showContainerDetails = true }) {
	const { service = '', margin_type = '', margin_slabs_currency = '', filters = {}, partner = {} } = data || {};
	const {
		commodity = '',
		container_type = '',
		container_size = '',
		location = {},
		origin_location = {},
		destination_location = {},
		trade_type = '',
	} = filters || {};
	const { business_name } = partner || {};
	const { origin } = getOriginMarginType({ origin_location, location });
	const setData = () => {
		setMarginBreakupData(data);
	};
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.flex}>
					<Pill size="md" color="yellow">{startCase(service)}</Pill>
					<div className={styles.origin_destination}>
						{origin && (
							<Pill size="md" color="yellow">{origin}</Pill>
						) }
						{destination_location?.display_name && (
							<Pill size="md" color="yellow">{destination_location?.display_name}</Pill>
						) }
					</div>
				</div>

				<div className={styles.flex}>
					{trade_type && <Pill size="md">{startCase(trade_type)}</Pill>}
					<div style={{ marginLeft: '10px' }}>{data?.organization?.business_name}</div>
				</div>
				<div className={styles.flex}>
					{data?.partner?.business_name ? (
						<Pill size="md" color="blue">
							Partner Entity:
							{' '}
							{startCase(business_name)}
						</Pill>
					) : null}
					{data?.margin_type ? (
						<Pill size="md" color="blue">
							Margin Type:
							{' '}
							{startCase(margin_type)}
						</Pill>
					) : null}
					{data?.margin_slabs_currency ? (
						<Pill size="md" color="blue">
							Margin Currency:
							{' '}
							{startCase(margin_slabs_currency)}
						</Pill>
					) : null}
				</div>
				{showContainerDetails && (
					<div className={styles.flex}>
						{container_size ? (
							<Pill size="md">
								Container Size:
								{' '}
								{startCase(container_size)}
							</Pill>
						) : null}
						{container_type ? (
							<Pill size="md">
								Container Type:
								{' '}
								{startCase(container_type)}
							</Pill>
						) : null }
						{commodity ? (
							<Pill size="md">
								Commodity:
								{' '}
								{startCase(commodity)}
							</Pill>
						) : null }
					</div>
				)}
				{data?.agent?.name ? (
					<div className={styles.agent_name}>
						{`Agent: ${data?.agent?.name} ${data?.agent?.email ? `(${data?.agent?.email})` : ''
						}`}
					</div>
				) : null}

			</div>
			<Button
				themeType="secondary"
				onClick={setData}
			>
				View details
			</Button>

		</div>

	);
}
export default Details;
