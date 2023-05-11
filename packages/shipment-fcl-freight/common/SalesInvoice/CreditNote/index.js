import Item from './Item';
import styles from './styles.module.css';

function CreditNote({
	list = [],
	refetch = () => {},
	invoiceData = {},
	invoicesList = [],
}) {
	return (
		<section className={styles.container}>
			<header className={styles.heading}>
				Credit Note
			</header>

			{(list || [])?.map((item) => (
				<Item
					item={item}
					refetch={refetch}
					invoicesList={invoicesList}
					invoiceData={invoiceData}
				/>
			))}
		</section>
	);
}

export default CreditNote;
