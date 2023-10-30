import RenderInvoiceNumber from '../../commons/RenderInvoiceNumber';
import { RenderAction } from '../../InvoiceTable/RenderFunctions/RenderAction';
import { RenderInvoiceDates } from '../../InvoiceTable/RenderFunctions/RenderInvoiceDates';
import { RenderToolTip } from '../../InvoiceTable/RenderFunctions/RenderToolTip';
import { RenderUrgency } from '../../InvoiceTable/RenderFunctions/RenderUrgency';

import BankDetails from './EditableBankDetails/BankDetails';
import EditableTdsInput from './EditableInput';
import EditablePayableAmount from './EditableInput/EditablePayableAmount';
import GetTableBodyCheckbox from './GetTableBodyCheckbox';

const getFunctions = ({
	onChangeTableBodyCheckbox = () => {},
	setEditedValue = () => {},
	apiData = {}, setApiData = () => {},
}) => ({
	renderCheckbox: (itemData) => (
		<GetTableBodyCheckbox
			onChangeTableBodyCheckbox={onChangeTableBodyCheckbox}
			itemData={itemData}
			apiData={apiData}
			setApiData={setApiData}
		/>
	),
	renderToolTip: (itemData, field) => (
		<RenderToolTip itemData={itemData} field={field} />
	),
	renderInvoiceDates: (itemData, field) => (
		<RenderInvoiceDates itemData={itemData} field={field} />
	),
	renderUrgencyTag: (itemData, field) => (
		<RenderUrgency itemData={itemData} field={field} />
	),
	renderAction: (itemData) => (
		<RenderAction itemData={itemData} hideIcDot />
	),
	renderEditableTds: (itemData, field) => (
		<EditableTdsInput itemData={itemData} field={field} setEditedValue={setEditedValue} />
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
	renderInvoiceNumber: (itemData, field) => (
		<RenderInvoiceNumber itemData={itemData} field={field} />
	),
});

export default getFunctions;
