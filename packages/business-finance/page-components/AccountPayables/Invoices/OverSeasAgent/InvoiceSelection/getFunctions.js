import EditableTdsInput from '../../CreatePayrun/SelectInvoices/EditableInput';
import EditablePayableAmount from '../../CreatePayrun/SelectInvoices/EditableInput/EditablePayableAmount';
import BankDetails from '../../CreatePayrun/ViewSelectedInvoices/BankDetails/index';
import Delete from '../../CreatePayrun/ViewSelectedInvoices/Delete/index';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';

import GetTableBodyCheckbox from './GetTableBodyCheckbox';

const getFunctions = ({
	onChangeTableBodyCheckbox = () => {}, setApiData = () => {},
	setEditedValue = () => {}, refetch = () => {}, invoiceData = {},
}) => ({
	renderCheckbox: (itemData) => (
		<GetTableBodyCheckbox
			itemData={itemData}
			onChangeTableBodyCheckbox={onChangeTableBodyCheckbox}
			apiData={invoiceData}
			setApiData={setApiData}
		/>
	),
	renderToolTip: (itemData, field) => (
		<RenderToolTip
			itemData={itemData}
			field={field}
		/>
	),
	renderInvoiceDates: (itemData, field) => (
		<RenderInvoiceDates
			itemData={itemData}
			field={field}
		/>
	),
	renderUrgencyTag: (itemData, field) => (
		<RenderUrgency
			itemData={itemData}
			field={field}
		/>
	),
	renderAction: (itemData) => (
		<RenderAction itemData={itemData} />
	),
	renderEditableTds: (itemData, field) => (
		<EditableTdsInput
			itemData={itemData}
			field={field}
			setEditedValue={setEditedValue}
		/>
	),
	renderEditablePayable: (itemData, field) => (
		<EditablePayableAmount
			itemData={itemData}
			field={field}
			setEditedValue={setEditedValue}
		/>
	),
	renderBankDetails: (itemData, field) => (
		<BankDetails
			itemData={itemData}
			field={field}
			setEditedValue={setEditedValue}
		/>
	),
	renderDelete: (itemData) => (<Delete itemData={itemData} refetch={refetch} />),

});

export default getFunctions;
