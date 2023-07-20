import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFtick, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import getLocationInfo from '../../../../utils/locations-search';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function PrimaryService({ serviceItem = {}, rateDetails = {}, details = {}, service_type = '' }) {
	const { shipping_line = {}, service_rates = [] } = rateDetails;

	const serviceData = Object.values(service_rates).find((service) => service.service_type === service_type);
	const {
		total_price_currency,
		total_price_discounted,
		departure,
		arrival,
		source,
		validity_start,
		validity_end,
	} = serviceData || {};

	const { origin, destination } = getLocationInfo(details, {}, 'search_type');

	const { port_code: originPort = '' } = origin;
	const { port_code: destinationPort = '' } = destination;

	return (
		<div key={serviceItem.key} className={styles.primary_service_item}>
			<div className={styles.icns_container}>
				<div className={styles.shipping_line}>
					<img
						src={shipping_line.logo_url}
						alt="shipping-line-icon"
						width={30}
						height={30}
					/>

					<strong>{shipping_line.business_name}</strong>
				</div>

				<IcCFtick
					className={styles.selected_icon}
					width={26}
					height={26}
					onClick={() => Toast.error('Primary service cannot be removed')}
				/>
			</div>

			<div className={styles.route}>
				<div className={styles.location}>
					<span className={styles.port_code}>{originPort}</span>

					<span className={styles.date}>
						{formatDate({
							date       : source === 'cogo_assured_rate' ? validity_start : departure,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
					</span>
				</div>

				<div className={styles.dotted_line}>
					<span className={styles.horizontal_line} />

					<IcMArrowRight
						className={styles.arrow_icon}
						fill="#000"
						width={20}
						height={20}
					/>
				</div>

				<div className={styles.location}>
					<span className={styles.port_code}>{destinationPort}</span>

					<span className={styles.date}>
						{formatDate({
							date       : source === 'cogo_assured_rate' ? validity_end : arrival,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
							formatType : 'date',
						})}
					</span>
				</div>
			</div>

			<span>
				Landed Cost:
				{' '}
				<strong>
					{formatAmount({
						amount   : total_price_discounted || DEFAULT_VALUE,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</strong>
			</span>
		</div>
	);
}

export default PrimaryService;
