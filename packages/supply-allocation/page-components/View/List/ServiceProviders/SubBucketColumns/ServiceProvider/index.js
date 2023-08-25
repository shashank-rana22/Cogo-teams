import { RatingComponent, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import Actions from '../Actions';

import styles from './styles.module.css';

function ServiceProvider({
	item = {},
	bucket_type = '',
	current_allocated_containers = '',
	rollingFclFreightSearchId = '',
}) {
	const {
		service_provider,
		service_provider_star_rating,
		service_provider_outstanding_currency,
		service_provider_outstanding_amount,
	} = item;

	return (
		<div
			style={{
				display        : 'flex',
				alignItems     : 'center',
				justifyContent : 'space-between',
			}}
		>
			<Actions
				item={item}
				bucket_type={bucket_type}
				current_allocated_containers={current_allocated_containers}
				rollingFclFreightSearchId={rollingFclFreightSearchId}
			/>
			<div
				style={{
					display       : 'flex',
					flexDirection : 'column',
					marginRight   : '10px',
					width         : '200px',
				}}
			>
				<Tooltip content={service_provider?.short_name} placement="top">
					<div
						style={{
							overflow     : 'hidden',
							textOverflow : 'ellipsis',
							whiteSpace   : 'nowrap',
						}}
					>
						{service_provider?.short_name}
					</div>
				</Tooltip>

				<div className={styles.rating_container}>
					<RatingComponent
						type="star"
						totalStars={5}
						value={service_provider_star_rating}
						size="sm"
						onClick={() => {}}
					/>
				</div>

				<div>
					{formatAmount({
						amount   : service_provider_outstanding_amount,
						currency : service_provider_outstanding_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
					{' '}
					Outstanding
				</div>
			</div>
		</div>
	);
}

export default ServiceProvider;
