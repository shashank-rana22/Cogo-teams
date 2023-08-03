import { Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import InvoiceContent from './InvoiceContent';
import styles from './styles.module.css';

function RenderInvoice({
	item = {},
	setCheckedProforma = () => {},
	checkedProforma = '',
	setShowBox = () => {},
	handleLineItemSelect = () => {},
	checkedLineItem = [],
	showPurchaseInvoicePopover = false,
	setShowPurchaseInvoicePopover = () => {},
}) {
	if (isEmpty(item?.collection_parties)) {
		return <div className={styles.container}>No Options</div>;
	}

	return item?.collection_parties?.map((ele) => {
		const isPopoverVisible = showPurchaseInvoicePopover && ele?.id === checkedProforma;
		return (
			<div className={styles.container} key={ele.id}>
				<div>
					{ele?.invoice_no ? ele?.invoice_no : ele?.proforma_invoice_no}
				</div>

				<Popover
					show={isPopoverVisible}
					visible={isPopoverVisible}
					placement="bottom"
					content={(
						<InvoiceContent
							lineItems={ele?.line_items}
							checkedLineItem={checkedLineItem}
							handleLineItemSelect={handleLineItemSelect}
						/>
					)}
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
		);
	});
}

export default RenderInvoice;
