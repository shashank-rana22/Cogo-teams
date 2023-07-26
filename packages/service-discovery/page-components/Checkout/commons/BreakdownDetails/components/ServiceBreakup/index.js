import RenderLineItem from '../RenderLineItem';

import styles from './styles.module.css';

function ServiceBreakup({
	item = {},
	index = 0,
	setRateDetails = () => {},
	fclLocalEmpty = true,
	disableForm = false,
}) {
	if (fclLocalEmpty) {
		return null;
	}

	const { line_items = [] } = item;

	const finalLineItems = line_items.reduce((acc, cur) => {
		if (acc.map((lineItem) => lineItem.code).includes(cur.code)) {
			return acc;
		}

		return [...acc, cur];
	}, []);

	return (
		<div className={styles.container}>
			{finalLineItems.map((lineItem, itemIndex) => (
				<RenderLineItem
					key={lineItem?.product_code}
					lineItem={lineItem}
					setRateDetails={setRateDetails}
					serviceIndex={index}
					lineItemIndex={itemIndex}
					disableForm={disableForm}
					item={item}
				/>
			))}
		</div>
	);
}

export default ServiceBreakup;
