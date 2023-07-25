import useGetEntityBanks from '../../../hooks/useGetEntityBank';
import { INVOICE_VIEW_FILTERS } from '../invoiceViewFilterControl';
import { PAYRUNS_BANK_DATE_FILTERS } from '../payrunPaidFilterControls';
import { UPLOAD_HISTORY_FILTERS } from '../uploadHistoryFilterControl';

const GetChooseFilterControls = ({ activePayrunTab, overseasData, isInvoiceView }) => {
	const { entityBank = [] } = useGetEntityBanks({});
	const powerControls = (banks = []) => (banks || []).map((control) => (control || []).map(
		({ id = '', beneficiary_name = '', account_number = '' }) => ({
			value : id,
			label : `${beneficiary_name} (${account_number})`,
		}),
	));
	const banks = (entityBank || []).map((control) => control.bank_details);

	const bankDetails = powerControls(banks);
	const flatBankDetails = (bankDetails || []).flat();

	const filtersControlsMapping = {
		PAID           : () => PAYRUNS_BANK_DATE_FILTERS(flatBankDetails, overseasData),
		UPLOAD_HISTORY : () => UPLOAD_HISTORY_FILTERS,
	};

	const filterFunction = filtersControlsMapping[activePayrunTab];
	if (filterFunction) {
		return filterFunction();
	}
	if (activePayrunTab !== 'PAID' && isInvoiceView) {
		return INVOICE_VIEW_FILTERS;
	}
	return [];
};
export default GetChooseFilterControls;
