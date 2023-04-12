import { Button } from '@cogoport/components';
import React from 'react';

import IP_STATE_CONDITONS from '../../../constants/IP_STATE_CONDITIONS';

const actions = ({
	status,
	serviceListItem,
	addRate,
	setShowIp = () => {},
	setItem = () => {},
	setAddSellPrice = () => {},
}) => {
	const isSameItem = serviceListItem.id === addRate?.item?.id;

	const onClick = () => {
		setItem({ serviceListItem, status });
	};
	if (
		status.status === 'quoted_by_service_provider'
		|| status.status === 'price_recieved'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => setAddSellPrice(true)}
			>
				{addRate && isSameItem ? 'CLOSE' : 'ADD SELL PRICE'}
			</Button>
		);
	}
	if (
		status.status === 'charges_incurred'
		&& serviceListItem.add_to_sell_quotation === null
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => {
					onClick();
					setAddSellPrice(true);
				}}
			>
				{addRate && isSameItem ? 'CLOSE' : 'REVIEW PRICE'}
			</Button>
		);
	}
	// FOR SHIPPER

	// if (status.status === 'customer_confirmation_pending' && isShipper) {
	// 	return (
	// 		<Button
	// 			themeType="secondary"
	// 			style={{ marginLeft: 10, height: '24px' }}
	// 			onClick={onClick}
	// 		>
	// 			{addRate && isSameItem ? 'CLOSE' : 'REVIEW PRICE'}
	// 		</Button>
	// 	);
	// }

	if (
		status.status === 'cancelled_by_supplier'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => setItem({ serviceListItem, status })}
			>
				REALLOCATE
			</Button>
		);
	}

	if (
		status.status === 'amendment_requested_by_importer_exporter'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => setItem({ serviceListItem, status })}
			>
				REVIEW COMMENTS
			</Button>
		);
	}

	if (
		(!IP_STATE_CONDITONS.includes(serviceListItem.state)
			|| !serviceListItem.invoice_preference)
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => {
					onClick();
					setShowIp(true);
				}}
			>
				{ isSameItem ? 'CLOSE' : 'ADD IP'}
			</Button>
		);
	}

	return false;
};

export default actions;
