import { Button } from '@cogoport/components';
import React from 'react';

import IP_STATE_CONDITONS from '../../../constants/IP_STATE_CONDITIONS';

const actions = ({
	status = {},
	serviceListItem,
	addRate,
	setShowModal = () => {},
	setItem = () => {},
	activeStakeholder = '',
	canEditCancelService = false,
}) => {
	const isSameItem = serviceListItem.id === addRate?.item?.id;

	const onClickSetItem = () => setItem({ serviceListItem, status });

	if (['quoted_by_service_provider', 'price_recieved'].includes(status.status)) {
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

	if (status.status === 'cancelled_by_supplier'
		&& ['booking_desk', 'booking_desk_manager', 'so1_so2_ops'].includes(activeStakeholder)) {
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
			|| !serviceListItem.invoice_preference) && canEditCancelService
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
