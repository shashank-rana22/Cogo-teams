import { RatingComponent } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import Actions from '../Actions';

function ServiceProvider({ item = {} }) {
	const {
		service_provider, service_provider_star_rating,
		service_provider_outstanding_currency, service_provider_outstanding_amount,
	} = item;

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

			<Actions item={item} />
			<div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px', width: '200px' }}>
				<div style={{
					overflow     : 'hidden',
					textOverflow : 'ellipsis',
					whiteSpace   : 'nowrap',
				}}
				>
					{service_provider?.short_name}

				</div>
				<div>
					<RatingComponent
						type="star"
						totalStars={5}
						value={service_provider_star_rating}
						size="sm"
						style={{ cursor: 'normal' }}
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
