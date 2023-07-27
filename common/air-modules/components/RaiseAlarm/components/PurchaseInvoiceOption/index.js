import { Checkbox, Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

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

	const content = (lineItem) => {
		const isChecked = checkedLineItem?.map((item) => item?.name);
		return (
			<div className={styles.content}>
				<Checkbox
					checked={(isChecked || []).includes(lineItem?.name)}
					onChange={() => handleLineItemSelect(lineItem)}
				/>
				<div>{lineItem?.name}</div>
				<div>{lineItem?.currency}</div>
				<div>{lineItem?.price}</div>
				<div>{lineItem?.quantity}</div>
				<div>{lineItem?.tax_percent}</div>
				<div>{lineItem?.tax_price}</div>
				<div>{lineItem?.total_tax_price}</div>
			</div>
		);
	};

	const contentInvoice = (lineItems) => (
		<div>
			{lineItems?.map((lineItem) => <div key={lineItems.id}>{content(lineItem)}</div>)}
		</div>
	);

	const renderInvoice = (item) => {
		if (isEmpty(item?.collection_parties)) {
			return <div className={styles.container}>No Options</div>;
		}

		return item?.collection_parties?.map((ele) => (
			<div className={styles.container} key={ele.id}>
				<div>
					{ele?.invoice_no ? ele?.invoice_no : ele?.proforma_invoice_no}
				</div>

				<Popover
					show={showPurchaseInvoicePopover && ele?.id === checkedProforma}
					visible={showPurchaseInvoicePopover && ele?.id === checkedProforma}
					placement="bottom"
					content={contentInvoice(ele?.line_items)}
					onClickOutside={() => {
						setShowPurchaseInvoicePopover(false);
						setShowBox(false);
					}}
					interactive
				>
					<div
						className={styles.view_invoices}
						role="presentation"
						onClick={() => {
							setCheckedProforma(ele?.id);
							setShowPurchaseInvoicePopover(true);
						}}
					>
						{ele?.invoice_type === 'purchase_invoice'
							? 'View Purchase Invoice'
							: 'View Proforma Invoice'}
					</div>
				</Popover>
			</div>
		));
	};

	return mappedData?.map((item) => <>{renderInvoice(item)}</>);
};

export default PurchaseInvoices;
