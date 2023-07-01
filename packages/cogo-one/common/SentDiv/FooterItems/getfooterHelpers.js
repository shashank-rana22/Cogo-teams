import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

export const ELEMENT_MAPPING = {
	buttons : (item) => <div key={item} className={cl`${styles.list_item} ${styles.btn_text}`}>{item}</div>,
	list    : (item) => {
		const { id, title, description } = item;
		return (
			<div key={`msg-list-item-${id}`} className={styles.list_item}>
				<div className={styles.list_item_title}>{title}</div>
				<div className={styles.list_item_description}>{description}</div>
			</div>
		);
	},
	products: (item) => {
		const { name = '', description = '', image_url = '', price = 0, currency = '', id = '' } = item || {};
		return (
			<div className={styles.catalog_flex} key={id}>
				<img src={image_url} alt={name} className={styles.img_styles} />
				<div className={styles.catalog_info}>
					<div className={styles.catalog_name}>{name}</div>
					<div className={styles.catalog_desc}>{description}</div>
					<div className={styles.catalog_currency}>
						{formatAmount({
							amount  : price,
							currency,
							options : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}

					</div>
				</div>
			</div>
		);
	},

};

export const getFooterItems = (response) => {
	const { btns = [], list = [], products = [] } = response || {};
	if (!isEmpty(btns)) {
		return { list: btns, type: 'buttons' };
	}
	if (!isEmpty(list)) {
		return { list, type: 'list' };
	}
	return { list: products, type: 'products' };
};
