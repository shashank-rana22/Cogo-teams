import { Modal } from '@cogoport/components';
import React from 'react';

import List from '../../../../../commons/List/index';

const config = {
	showHeader   : true,
	headerStyles : {
		marginBottom : '16px',
		borderRadius : '8px',
		background   : '#333',
		marginTop    : '20px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		lineHeight : '14px',
	},
	itemStyles : { marginTop: '8px' },
	fields     : [
		{
			label : 'Purchase Invoice Line Item',
			func  : 'PurchaseInvoiceLineItem',
			span  : 5,
		},
		{
			label : 'Live Invoice Line Item',
			func  : 'LiveInvoiceLineItem',
			span  : 5,
		},
		{
			label : 'Variance',
			func  : 'Variance',
			span  : 2,
		},
	],
};

function VarianceView({
	show,
	onClose,
	data,
	loading,
	currency,
}) {
	const functions = {
		PurchaseInvoiceLineItem: (item) => {
			const {
				purchase_line_items: purchaseLineItems,
				purchase_invoice: purchaseInvoice,
			} = item || {};
			return (
				<div>
					<span>
						{(purchaseLineItems || [])
							.map((charge) => charge.name)
							.join(',')}
					</span>
					<span style={{ marginLeft: 4 }}>
						(
						{currency}
						{' '}
						{purchaseInvoice}
						)
					</span>
				</div>
			);
		},
		LiveInvoiceLineItem: (item) => {
			const { buy_line_items: buyLineItems, live_invoice: LineInvoice } = item || {};
			return (
				<div>
					<span>
						{(buyLineItems || []).map((charge) => charge.name).join(',')}
					</span>
					<span style={{ marginLeft: 4 }}>
						(
						{currency}
						{' '}
						{LineInvoice}
						)
					</span>
				</div>
			);
		},
		Variance: (item) => {
			const { variance } = item || {};
			return (
				<div>
					{currency}
					{' '}
					{variance}
				</div>
			);
		},
	};

	return (
		<Modal size="lg" show={show} onClose={onClose}>
			<Modal.Header title="Variance" />
			<Modal.Body>
				<div>
					<List
						config={config}
						itemData={{ list: data }}
						loading={loading}
						functions={functions}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default VarianceView;