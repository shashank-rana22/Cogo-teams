import { Toggle } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../commons/EmptyState';

import OrgShipments from './OrgShipments';
import ShipmentInvoices from './ShipmentInvoices';
import styles from './styles.module.css';

function formatAmountHelper({ amount = '', currency = '' }) {
	return formatAmount({
		amount,
		currency,
		options: {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});
}

function AdditionalShipmentInfo({ item = {}, filters = {}, setFilters = () => {} }) {
	const [toggleVal, setToggleVal] = useState({});
	const [selectedTradeParty, setSelectedTradeParty] = useState({});

	const tradePartyDetails = item?.invoice_status?.invoice_total;
	const currency = item?.currency;

	const toggleMoreInfo = (currentTradeParty) => {
		setSelectedTradeParty((prev) => ({
			...prev,
			[currentTradeParty]: !selectedTradeParty?.[currentTradeParty],
		}));
	};

	return isEmpty(tradePartyDetails) ? <EmptyState />
		: (tradePartyDetails || []).map((tradeParty) => {
			const { tax_number, business_name, total, organization_trade_party_id } = tradeParty || {};

			return (
				<div className={styles.container} key={tax_number}>
					<div className={styles.header}>
						<div className={styles.customer}>
							Customer:
							{' '}
							{business_name}
						</div>

						<div>
							Total Customer Outstanding of shipment:
							{' '}
							{formatAmountHelper({ amount: total, currency })}
						</div>

						<div>
							Total Outstanding of customer:
							{' '}
							{formatAmountHelper({ amount: item?.invoice_status?.outstanding_amount, currency })}
						</div>

						<div className={styles.more_info}>
							{!selectedTradeParty?.[organization_trade_party_id] ? (
								<IcMArrowRotateDown onClick={() => toggleMoreInfo(organization_trade_party_id)} />
							) : (
								<IcMArrowRotateUp onClick={() => toggleMoreInfo(organization_trade_party_id)} />
							)}
						</div>
					</div>

					{selectedTradeParty?.[organization_trade_party_id] ? (
						<>
							<Toggle
								size="md"
								onLabel="All Shipments"
								offLabel="Invoices Related To Shipments"
								onChange={() => setToggleVal({
									...toggleVal,
									[organization_trade_party_id]:
								!toggleVal?.[organization_trade_party_id],

								})}
								className={styles.toggle}
							/>

							{!toggleVal?.[organization_trade_party_id]
								? <ShipmentInvoices item={item} tradeParty={tradeParty} />
								: (
									<OrgShipments
										item={item}
										filters={filters}
										setFilters={setFilters}
										tradeParty={tradeParty}
									/>
								)}
						</>
					) : null}
				</div>
			);
		});
}
export default AdditionalShipmentInfo;
