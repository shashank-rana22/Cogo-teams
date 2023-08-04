import { Toggle } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../commons/EmptyState';

import OrgShipments from './OrgShipments';
import ShipmentInvoices from './ShipmentInvoices';
import styles from './styles.module.css';

function AdditionalShipmentInfo({ item = {}, filters = {}, setFilters = () => {} }) {
	const [toggleVal, setToggleVal] = useState({});
	const [selectedTradeParty, setSelectedTradeParty] = useState({});

	const tradePartyDetails = item?.invoice_status?.invoice_total;

	return isEmpty(tradePartyDetails) ? <EmptyState />
		: (tradePartyDetails || []).map((tradeParty) => (
			<div className={styles.container} key={tradeParty?.tax_number}>
				<div className={styles.header}>
					<div className={styles.customer}>
						Customer:
						{' '}
						{tradeParty?.business_name}
					</div>

					<div>
						Total Customer Outstanding of shipment:
						{' '}
						{formatAmount({
							amount   : tradeParty?.total,
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}

					</div>
					<div>
						Total Outstanding of customer:
						{' '}
						{formatAmount({
							amount: item?.invoice_status
								?.outstanding_amount,
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
					<div className={styles.more_info}>
						{ !selectedTradeParty?.[tradeParty?.organization_trade_party_id]
							? (
								<IcMArrowRotateDown onClick={() => {
									setSelectedTradeParty({
										...selectedTradeParty,
										[tradeParty?.organization_trade_party_id]:
								!selectedTradeParty?.[tradeParty?.organization_trade_party_id],

									});
								}}
								/>
							)
							: (
								<IcMArrowRotateUp onClick={() => {
									setSelectedTradeParty({
										...selectedTradeParty,
										[tradeParty?.organization_trade_party_id]:
								!selectedTradeParty?.[tradeParty?.organization_trade_party_id],

									});
								}}
								/>
							)}
					</div>
				</div>

				{selectedTradeParty?.[tradeParty?.organization_trade_party_id]
					? (
						<>
							<Toggle
								size="md"
								onLabel="All Shipments"
								offLabel="Invoices Related To Shipments"
								onChange={() => setToggleVal({
									...toggleVal,
									[tradeParty?.organization_trade_party_id]:
								!toggleVal?.[tradeParty?.organization_trade_party_id],

								})}
								className={styles.toggle}
							/>

							{
						!toggleVal?.[tradeParty?.organization_trade_party_id]
							? <ShipmentInvoices item={item} tradeParty={tradeParty} /> : (
								<OrgShipments
									item={item}
									filters={filters}
									setFilters={setFilters}
									tradeParty={tradeParty}
								/>
							)
						}
						</>
					) : null}
			</div>
		));
}
export default AdditionalShipmentInfo;
