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

			<div className={styles.cn_list_container}>
				{(list || [])?.map((item) => (
					<Item
						key={item?.id}
						item={item}
						refetch={refetch}
						invoicesList={invoicesList}
						invoiceData={invoiceData}
					/>
				))}
			</div>
		</section>
	);
}

export default CreditNote;
