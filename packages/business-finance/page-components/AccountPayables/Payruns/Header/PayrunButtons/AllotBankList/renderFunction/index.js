import React from 'react';

import AmountWithDetails from './AmountWithDetails';
import BankDetails from './BankDetails';
import FormatedAmount from './FormatedAmount';
import FormatedBalance from './FormatedBalance';
import IconPopover from './IconPopover';
import ModifiedCurrency from './ModifiedCurrency';
import RequestAmount from './RequestAmount';
import SelectRadio from './SelectRadio';

const RenderFunction = (
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
		renderAmount: (itemData) => (
			<FormatedAmount itemData={itemData} selectedPayrun={selectedPayrun} checkedRow={checkedRow} />
		),
		renderBalanceAmount: (itemData) => (
			<FormatedBalance itemData={itemData} selectedPayrun={selectedPayrun} checkedRow={checkedRow} />
		),
	};
	return {
		functions,
	};
};

export default RenderFunction;
