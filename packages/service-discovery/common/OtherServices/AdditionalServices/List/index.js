import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AccordianView from './AccordianView';
import ItemContent from './ItemContent';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const INITIAL_VALUE = 0;
const DEFAULT_VALUE = 0;

function List({
	list = [],
	details = {},
	rateCardData = {},
	loading = false,
	type = 'seller',
	onClickAdd = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
}) {
	const [isOpen, setIsOpen] = useState({});

	let currency = '';

	const totalPrice = list
		.map((listItem) => {
			if (listItem.rateData && !isEmpty(listItem.rateData)) {
				return (listItem.rateData || []).map((rateItem) => {
					const { total_price_discounted = 0, total_price_currency } = rateItem;
					currency = total_price_currency;
					return total_price_discounted;
				});
			}
			return DEFAULT_VALUE;
		})
		.flat()
		.filter((value) => typeof value === 'number')
		.reduce((accumulator, value) => accumulator + value, INITIAL_VALUE);

	return (
		<div className={styles.container}>
			<ListHeader
				currency={currency}
				type={type}
				totalPrice={totalPrice}
			/>

			<div className={styles.accordian_container}>
				{list.map((serviceItem) => (
					<AccordianView
						key={serviceItem.name}
						active={isOpen.name === serviceItem.name && serviceItem.isSelected}
						setActive={setIsOpen}
						title={(
							<ListItem
								serviceItem={serviceItem}
								loading={loading}
								onClickAdd={onClickAdd}
								setIsOpen={setIsOpen}
								isOpen={isOpen}
								SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
							/>
						)}
						content={(
							<ItemContent
								serviceItem={serviceItem}
								details={details}
								rateCardData={rateCardData}
							/>
						)}
					/>
				))}
			</div>
		</div>
	);
}

export default List;
