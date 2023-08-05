import React from 'react';

import AmountWithDetails from './AmountWithDetails';
import BankDetails from './BankDetails';
import FormatedAmount from './FormatedAmount';
import IconPopover from './IconPopover';
import ModifiedCurrency from './ModifiedCurrency';
import RequestAmount from './RequestAmount';
import SelectRadio from './SelectRadio';

const renderFunction = (
	{
		selectedPayrun,
		selectedBankId,
		setSelectedBankId,
		checkedRow,
		setCheckedRow,
	},
) => {
	const functions = {
		renderBankDetails: (itemData) => (
			<BankDetails itemData={itemData} />
		),
		renderRequestButton: (itemData) => (
			<RequestAmount itemData={itemData} selectedPayrun={selectedPayrun} checkedRow={checkedRow} />
		),
		renderAmountWithDetails: (itemData) => (
			<AmountWithDetails
				itemData={itemData}
				selectedPayrun={selectedPayrun}
				checkedRow={checkedRow}
			/>
		),
		renderCurrency: (itemData) => (
			<ModifiedCurrency itemData={itemData} selectedPayrun={selectedPayrun} checkedRow={checkedRow} />
		),
		renderRadio: (itemData) => (
			<SelectRadio
				itemData={itemData}
				selectedBankId={selectedBankId}
				setSelectedBankId={setSelectedBankId}
				selectedPayrun={selectedPayrun}
				checkedRow={checkedRow}
				setCheckedRow={setCheckedRow}
			/>
		),
		renderPopoverIcon: (itemData) => (
			<IconPopover itemData={itemData} />
		),
		renderAmount: (itemData, field) => (
			<FormatedAmount itemData={itemData} selectedPayrun={selectedPayrun} checkedRow={checkedRow} field={field} />
		),
	};
	return {
		functions,
	};
};

export default renderFunction;
