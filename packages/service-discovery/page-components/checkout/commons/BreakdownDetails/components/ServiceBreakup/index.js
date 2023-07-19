import RenderLineItem from '../RenderLineItem';

import styles from './styles.module.css';

function ServiceBreakup({
	item = {},
	index = 0,
	detail = {},
	rate = {},
	setRateDetails = () => {},
	fclLocalEmpty,
	shouldEditMargin,
	disableForm,
}) {
	if (fclLocalEmpty) {
		return (
			<div className={styles.locals_rate}>Locals charges will be billed at Actual</div>
		);
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
					id_prefix={`${index}_${itemIndex}`}
					setRateDetails={setRateDetails}
					serviceIndex={index}
					lineItemIndex={itemIndex}
					rate={rate}
					shouldEditMargin={shouldEditMargin}
					detail={detail}
					service_type={item.service_type}
					disableForm={disableForm}
				/>
			))}
		</div>
	);
}

export default ServiceBreakup;
