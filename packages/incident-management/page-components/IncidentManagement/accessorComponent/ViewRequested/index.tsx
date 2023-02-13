import React from 'react';

import BankDatailsModal from './BankDetailsModal';
import IcJvApproval from './IcJvApproval';
import JournalVoucher from './JournalVoucher';
import RequestCN from './RequestCN';
import SettlementModal from './SettlementModal';
import TdsDeviationModal from './TdsDeviationModal';

function ViewRequested({ itemData }) {
	const { type } = itemData || {};
	if (type === 'BANK_DETAIL_APPROVAL') {
		return (
			<BankDatailsModal itemData={itemData} />
		);
	}
	if (type === 'TDS_APPROVAL') {
		return (
			<TdsDeviationModal itemData={itemData} />
		);
	}
	if (type === 'ISSUE_CREDIT_NOTE') {
		return (
			<RequestCN itemData={itemData} />
		);
	}
	if (type === 'JOURNAL_VOUCHER_APPROVAL') {
		return (
			<JournalVoucher itemData={itemData} />
		);
	}
	if (type === 'SETTLEMENT_APPROVAL') {
		return (
			<SettlementModal itemData={itemData} />
		);
	}
	if (type === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL') {
		return (
			<IcJvApproval itemData={itemData} />
		);
	}
	return null;
}

export default ViewRequested;
