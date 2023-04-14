import { Button } from '@cogoport/components';
import React from 'react';

import IP_STATE_CONDITONS from '../../../constants/IP_STATE_CONDITIONS';

const actions = ({
	status,
	serviceListItem,
	addRate,
	setShowModal = () => {},
	setItem = () => {},
	activeStakeholder = '',
}) => {
	const isSameItem = serviceListItem.id === addRate?.item?.id;

	const onClickSetItem = () => setItem({ serviceListItem, status });

	if (
		status.status === 'quoted_by_service_provider'
		|| status.status === 'price_recieved'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => setShowModal('add_sell_price')}
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
					onClickSetItem();
					setShowModal('add_sell_price');
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
		status.status === 'cancelled_by_supplier' && activeStakeholder === 'service_ops_1'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={onClickSetItem}
			>
				REALLOCATE
			</Button>
		);
	}

	if (
		status.status === 'amendment_requested_by_importer_exporter' && activeStakeholder === 'booking_agent'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => {
					onClickSetItem();
					setShowModal('add_sell_price');
				}}
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
					onClickSetItem();
					setShowModal('ip');
				}}
			>
				{ isSameItem ? 'CLOSE' : 'ADD IP'}
			</Button>
		);
	}

	return false;
};

export default actions;
