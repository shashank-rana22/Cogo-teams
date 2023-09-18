import Header from './Header';
import InvoiceServiceWise from './InvoiceServiceWise';
import styles from './styles.module.css';

function ItemHeader({
	invoice = {},
	loading = false,
	invoicesList = [],
	bfInvoiceRefetch = () => {},
	purchaseInvoicesRefetch = () => {},
}) {
	return (
		<div className={styles.container}>

			<Header
				invoice={invoice}
				invoicesList={invoicesList}
				bfInvoiceRefetch={bfInvoiceRefetch}
				purchaseInvoicesRefetch={purchaseInvoicesRefetch}
			>

				<div className={styles.invoice_info}>

					{(invoice?.services || []).map((item) => (

						<InvoiceServiceWise
							item={item}
							loading={loading}
							key={item?.service_id}
						/>

					))}

				</div>

			</Header>

		</div>
	);
}

export default ItemHeader;
