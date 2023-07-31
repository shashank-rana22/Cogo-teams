import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState, useMemo } from 'react';

import FclCard from '../FclCard';

import styles from './styles.module.css';

const format = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	formatType : 'date',
});

function CogoAssuredCard({
	rates = [],
	detail = {},
	setScreen = () => {},
	setComparisonRates = () => {},
	comparisonRates = {},
	refetchSearch = () => {},
	infoBanner = {},
	setInfoBanner = () => {},
}) {
	const [selectedCard, setSelectedCard] = useState(rates?.[GLOBAL_CONSTANTS.zeroth_index]?.id);
	const [cardData, setCardData] = useState(rates?.[GLOBAL_CONSTANTS.zeroth_index]);

	const options = useMemo(() => rates.map((rateItem) => {
		const { id = '', freight_price_currency, freight_price_discounted = 0, schedules = {} } = rateItem;

		const { validity_start, validity_end } = schedules;

		return {
			name  : id,
			value : id,
			label : (
				<div className={styles.option_container}>
					<span className={styles.sailing_week}>
						{`${format(validity_start)} to ${format(validity_end)}`}
					</span>

					<span className={styles.freight_price}>
						{formatAmount({
							amount   : freight_price_discounted,
							currency : freight_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</span>
				</div>
			),
		};
	}), [rates]);

	const onChange = (rateId) => {
		const rate = rates.find((rateItem) => rateItem.id === rateId);
		setSelectedCard(rateId);
		setCardData(rate);
	};

	return (
		<div className={styles.container}>
			<FclCard
				rateCardData={cardData || {}}
				detail={detail}
				setScreen={setScreen}
				setComparisonRates={setComparisonRates}
				comparisonRates={comparisonRates}
				refetchSearch={refetchSearch}
				infoBanner={infoBanner}
				setInfoBanner={setInfoBanner}
				cogoAssuredOptions={options}
				onChange={onChange}
				selectedCogoAssuredCard={selectedCard}
			/>
		</div>
	);
}

export default CogoAssuredCard;
