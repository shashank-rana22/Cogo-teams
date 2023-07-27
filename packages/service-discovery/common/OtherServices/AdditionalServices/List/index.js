import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AccordianView from '../../common/AccordianView';

import ItemContent from './ItemContent';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const INITIAL_VALUE = 0;
const DEFAULT_VALUE = 0;

function List({
	list = [],
	detail = {},
	rateCardData = {},
	type = 'seller',
	setHeaderProps = () => {},
	refetch = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
}) {
	const [active, setActive] = useState('');

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
						itemKey={serviceItem.name}
						active={active}
						isOpen={serviceItem.isSelected}
						setActive={setActive}
						title={(
							<ListItem
								serviceItem={serviceItem}
								detail={detail}
								rateCardData={rateCardData}
								setHeaderProps={setHeaderProps}
								refetch={refetch}
								SERVICES_CANNOT_BE_REMOVED={SERVICES_CANNOT_BE_REMOVED}
							/>
						)}
						content={(
							<ItemContent
								serviceItem={serviceItem}
								detail={detail}
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
