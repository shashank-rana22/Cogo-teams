import { Button } from '@cogoport/components';
import React from 'react';

import IP_STATE_CONDITONS from '../../../constants/IP_STATE_CONDITIONS';

const actions = ({
	status,
	activeTab,
	setAddRate,
	serviceListItem,
	isShipper,
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
	if (status.status === 'customer_confirmation_pending' && isShipper) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={onClick}
			>
				{addRate && isSameItem ? 'CLOSE' : 'REVIEW PRICE'}
			</Button>
		);
	}
	if (
		status.status === 'cancelled_by_supplier'
	) {
		return (
			<Button
				themeType="secondary"
				style={{ marginLeft: 10, height: '24px' }}
				onClick={() => setAddRate({ serviceListItem, status, setAddRate })}
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
				onClick={() => setAddRate({ serviceListItem, status })}
			>
				REVIEW COMMENTS
			</Button>
		);
	}

	if (
		(!IP_STATE_CONDITONS.find((state) => state === serviceListItem.state)
			|| !serviceListItem.invoice_preference)
		&& activeTab !== 'purchase_invoice'
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
