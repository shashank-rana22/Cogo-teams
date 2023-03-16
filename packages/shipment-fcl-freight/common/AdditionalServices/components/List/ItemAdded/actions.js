import { Button } from '@cogoport/components';
import React from 'react';

import CC from '../../../../../utils/condition-constants';
import IP_STATE_CONDITONS from '../../../constants/IP_STATE_CONDITIONS';

const actions = ({
	status,
	activeTab,
	setAddRate,
	item,
	isConditionMatches,
	isShipper,
	scope,
	addRate,
	setShowIp = () => {},
	shipment_data = {},
}) => {
	const isSameItem = item.id === addRate?.item?.id;
	const onClick = () => {
		if (addRate) {
			setAddRate(null);
		} else {
			setAddRate({ item, status });
		}
	};
	if (
		status.status === 'quoted_by_service_provider'
		|| status.status === 'price_recieved'
	) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={() => setAddRate({ item, status })}
			>
				{addRate && isSameItem ? 'CLOSE' : 'ADD SELL PRICE'}
			</Button>
		);
	}
	if (
		status.status === 'charges_incurred'
		&& item.add_to_sell_quotation === null
	) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={() => setAddRate({ item, status })}
			>
				{addRate && isSameItem ? 'CLOSE' : 'REVIEW PRICE'}
			</Button>
		);
	}
	if (status.status === 'customer_confirmation_pending' && isShipper) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={onClick}
			>
				{addRate && isSameItem ? 'CLOSE' : 'REVIEW PRICE'}
			</Button>
		);
	}
	if (
		status.status === 'requested_for_service_provider'
		&& scope === 'app'
		&& !isShipper
	) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={() => {
					setAddRate({ item, status });
				}}
			>
				EDIT PRICE
			</Button>
		);
	}
	if (
		status.status === 'cancelled_by_supplier'
		&& scope === 'partner'
		&& isConditionMatches(CC.SERVICE_OPS_VIEW)
	) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={() => setAddRate({ item, status, setAddRate })}
			>
				REALLOCATE
			</Button>
		);
	}

	if (
		status.status === 'amendment_requested_by_importer_exporter'
		&& scope === 'partner'
		&& isConditionMatches(CC.BOOKING_AGENT_VIEW, 'or')
	) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={() => setAddRate({ item, status })}
			>
				REVIEW COMMENTS
			</Button>
		);
	}

	if (
		(!IP_STATE_CONDITONS.find((state) => state === item.state)
			|| !item.invoice_preference)
		&& activeTab !== 'purchase_invoice'
		&& shipment_data?.shipment_type !== 'air_freight'
	) {
		return (
			<Button
				className="secondary sm"
				style={{ marginLeft: 10 }}
				onClick={() => {
					onClick();
					setShowIp(true);
				}}
			>
				{addRate && isSameItem ? 'CLOSE' : 'ADD IP'}
			</Button>
		);
	}

	return false;
};

export default actions;
