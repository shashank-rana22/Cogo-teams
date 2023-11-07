import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import CargoInsurance from '../../CargoInsurance';
import AccordionView from '../../common/AccordionView';

import ItemContent from './ItemContent';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const INITIAL_REDUCER_VALUE = 0;
const DEFAULT_VALUE = 0;

function List({
	list = [],
	detail = {},
	rateCardData = {},
	type = 'origin',
	setHeaderProps = () => {},
	refetch = () => {},
	SERVICES_CANNOT_BE_REMOVED = [],
	startingPrices = [],
	startingPriceLoading = false,
	refetchLoading = false,
	isMobile = false,
}) {
	const [active, setActive] = useState('');

	let currency = '';

	const totalPrice = list.reduce((accumulator, listItem) => {
		if (listItem.rateData && !isEmpty(listItem.rateData)) {
			return accumulator + listItem.rateData.reduce((subTotal, rateItem) => {
				const { total_price_discounted = 0, total_price_currency } = rateItem;
				currency = total_price_currency;
				return subTotal + (typeof total_price_discounted === 'number' ? total_price_discounted : DEFAULT_VALUE);
			}, INITIAL_REDUCER_VALUE);
		}
		return accumulator + DEFAULT_VALUE;
	}, INITIAL_REDUCER_VALUE);

	return (
		<div className={styles.container}>
			<ListHeader
				currency={currency}
				type={type}
				totalPrice={totalPrice}
			/>

			<div className={styles.accordian_container}>
				{list.map((serviceItem) => {
					if (serviceItem.name === 'cargo_insurance') {
						return (
							<CargoInsurance
								key="cargo_insurance"
								data={detail}
								refetch={refetch}
								rateCardData={rateCardData}
							/>
						);
					}
					return (
						<AccordionView
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
									startingPrices={startingPrices}
									startingPriceLoading={startingPriceLoading}
									refetchLoading={refetchLoading}
									isMobile={isMobile}
								/>
							)}
						>
							<ItemContent
								serviceItem={serviceItem}
								detail={detail}
								rateCardData={rateCardData}
								isMobile={isMobile}
							/>
						</AccordionView>
					);
				})}
			</div>
		</div>
	);
}

export default List;
