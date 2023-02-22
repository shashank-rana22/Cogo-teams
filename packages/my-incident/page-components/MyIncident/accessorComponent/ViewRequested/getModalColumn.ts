import IcJvColumns from '../../configs/ic-jv-approval';
import SettlementColumn from '../../configs/settelement-table';

const getModalColumns = (type: string) => {
	if (type === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL') {
		return IcJvColumns;
	}
	if (type === 'SETTLEMENT_APPROVAL') {
		return SettlementColumn;
	}
	return null;
};

export default getModalColumns;
