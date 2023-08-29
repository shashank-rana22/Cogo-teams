import Item from '../CreditNote/Item';

import styles from './styles.module.css';

function CrossEntityCreditNote({
	list = [],
	invoicesList = [],
}) {
	return (
		<section className={styles.container}>
			<header className={styles.heading}>
				Cross Entity Credit Note
			</header>

			<div className={styles.cn_list_container}>
				{(list || [])?.map((item) => (
					<Item
						key={item?.id}
						item={item}
						invoicesList={invoicesList}
						isCrossEntity
					/>
				))}
			</div>
		</section>
	);
}

export default CrossEntityCreditNote;
