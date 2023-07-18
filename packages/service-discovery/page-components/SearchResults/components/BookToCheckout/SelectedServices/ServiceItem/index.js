import { Toast } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMMinusInCircle, IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const getServiceName = (service) => {
	const { trade_type = '', service_type = '' } = service || {};
	if (trade_type === 'export') {
		return `origin_${service_type}`;
	}
	return `destination_${service_type}`;
};

function ServiceItem({
	serviceItem = {},
	addedServices = [],
	service_rates = {},
	setAddedServices = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
}) {
	const [isHovered, setIsHovered] = useState(false);

	const { key:service = '', icon:Icon } = serviceItem || {};

	const isSelected = addedServices.includes(service);

	const serviceData = Object.values(service_rates).find((ser) => getServiceName(ser) === service);

	const { total_price_currency, total_price_discounted, is_rate_available } = serviceData || {};

	const handleRemove = () => {
		if (SERVICES_CANNOT_BE_REMOVED.includes(service)) { Toast.error('This service cannot be removed'); return; }

		setAddedServices((prev) => (prev.filter((item) => item !== service)));
	};

	const handleAdd = () => { setAddedServices([...addedServices, service]); };

	const handleMouseEnter = () => { setIsHovered(true); };
	const handleMouseLeave = () => { setIsHovered(false); };

	const SelectedIcon = isHovered && !SERVICES_CANNOT_BE_REMOVED.includes(service) ? IcMMinusInCircle : IcCFtick;

	return (
		<div
			key={service}
			className={`${styles.container} ${isSelected ? styles.selected_service : {}}`}
		>
			<div className={styles.icns_container}>
				<Icon width={32} height={32} />

				{isSelected ? (
					<SelectedIcon
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						height={24}
						width={24}
						className={styles.tick_icon}
						onClick={handleRemove}
					/>
				) : (
					<IcMPlus
						height={22}
						width={22}
						className={styles.add_icon}
						fill="black"
						onClick={handleAdd}
					/>
				)}
			</div>

			<span className={styles.label}>{startCase(service)}</span>

			<span className={styles.price}>
				{is_rate_available ? (
					formatAmount({
						amount   : total_price_discounted || 0,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})
				) : '--'}
			</span>
		</div>
	);
}

export default ServiceItem;
