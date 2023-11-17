import { Pill, Tooltip, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo, IcMLock, IcMUnlock } from '@cogoport/icons-react';
import { useContext } from 'react';

import ContainerDetails from '../../../../../../../../common/ContainerDetails';
import LocationDetails from '../../../../../../../../common/LocationDetails';
import { CheckoutContext } from '../../../../../../context';

import ShippingLineDetails from './ShippingLineDetails';
import styles from './styles.module.css';

function BookingDetails() {
	const {
		rate = {},
		detail = {},
		primaryService = {},
	} = useContext(CheckoutContext);

	const { primary_service = '', services = {} } = detail;

	const { shipping_line = {} } = primaryService;

	const { total_price_discounted = 0, total_price_currency = '', source = '' } = rate;

	const { quotation_email_sent_at = '' } = detail;

	return (
		<div className={styles.container}>
			<Pill
				size="md"
				color="#FEF199"
				className={styles.pill}
			>
				Spotline Booking
			</Pill>

			<ShippingLineDetails shipping_line={shipping_line} source={source} />

			<LocationDetails data={primaryService} />

			<ContainerDetails
				primary_service={primary_service}
				services={services}
			/>

			<div className={cl`${styles.total_price} ${quotation_email_sent_at && styles.locked}`}>
				{quotation_email_sent_at ? (
					<IcMLock style={{ marginRight: '6px' }} />
				) : <IcMUnlock style={{ marginRight: '6px' }} />}

				{formatAmount({
					amount   : total_price_discounted,
					currency : total_price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}

				<Tooltip
					content="This Price is excluding tax"
					placement="top"
				>
					<IcMInfo width={16} height={16} style={{ marginLeft: '6px' }} />
				</Tooltip>
			</div>
		</div>
	);
}

export default BookingDetails;
