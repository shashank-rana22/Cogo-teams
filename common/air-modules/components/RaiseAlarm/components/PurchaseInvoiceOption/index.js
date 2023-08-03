import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import RenderInvoice from './RenderInvoice';

const PurchaseInvoices = ({
	mappedData = [],
	setCheckedLineItem = () => {},
	checkedLineItem = [],
	setCheckedProforma = () => {},
	checkedProforma = '',
	setShowBox = () => {},
}) => {
	const [showPurchaseInvoicePopover, setShowPurchaseInvoicePopover] = useState(false);

	const handleLineItemSelect = (item) => {
		if (isEmpty(checkedLineItem)) {
			setCheckedLineItem([item]);
		} else {
			const alreadyChecked = (checkedLineItem || []).filter(
				(li) => li?.name === item?.name,
			);

			if (!isEmpty(alreadyChecked)) {
				const remainingChecked = (checkedLineItem || []).filter(
					(li) => li?.name !== item?.name,
				);
				setCheckedLineItem(remainingChecked);
			} else {
				setCheckedLineItem([...checkedLineItem, item]);
			}
		}
	};

	return mappedData?.map((item) => (
		<RenderInvoice
			key={item}
			item={item}
			setCheckedProforma={setCheckedProforma}
			checkedProforma={checkedProforma}
			setShowBox={setShowBox}
			handleLineItemSelect={handleLineItemSelect}
			checkedLineItem={checkedLineItem}
			showPurchaseInvoicePopover={showPurchaseInvoicePopover}
			setShowPurchaseInvoicePopover={setShowPurchaseInvoicePopover}
		/>
	));
};

export default PurchaseInvoices;
