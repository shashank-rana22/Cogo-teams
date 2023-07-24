import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ICONS_MAPPING from '../icons-mapping';

import styles from './styles.module.css';

const INITIAL_VALUE = 0;

const LABEL_MAPPING = {
	seller : 'Seller Responsibilities',
	buyer  : 'Buyer Responsibilities',
};

const getRates = (service = {}) => {
	const { rateData = {} } = service;

	if (!rateData || isEmpty(rateData) || !rateData.is_rate_available) {
		return 'No Rates';
	}

	return formatAmount({
		amount   : rateData.total_price_discounted,
		currency : rateData.total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});
};

function List({ list = [], loading = false, type = 'seller', onClickAdd = () => {} }) {
	let currency = '';

	const totalPrice = list
		.map((listItem) => {
			if (listItem.rateData && !isEmpty(listItem.rateData)) {
				const { total_price_discounted = 0, total_price_currency } = listItem.rateData;
				currency = total_price_currency;
				return total_price_discounted;
			}
			return 0;
		})
		.filter((value) => typeof value === 'number')
		.reduce((accumulator, value) => accumulator + value, INITIAL_VALUE);

	return (
		<div className={styles.container}>
			{!isEmpty(list) ? (
				<div style={{ marginBottom: 16 }}>
					<div className={styles.header}>
						<span>{LABEL_MAPPING[type]}</span>

						<div className={styles.total_price}>
							<span className={styles.cost_label}>Total landed Cost:</span>

							<strong>
								{formatAmount({
									amount  : totalPrice,
									currency,
									options : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
							</strong>
						</div>
					</div>

					{list.map((serviceItem) => (
						<div
							role="presentation"
							key={serviceItem.name}
							disabled={loading}
							className={`${styles.service} ${serviceItem.isSelected ? styles.active : null}`}
						>

							<div className={styles.service_div}>
								<span className={styles.icon}>
									{ICONS_MAPPING[serviceItem.service_type]}
								</span>

								<span className={styles.service_text}>
									{serviceItem.title}
								</span>
							</div>

							<div className={styles.icn_container}>
								{serviceItem.isSelected ? (
									<strong className={styles.rate}>{getRates(serviceItem)}</strong>
								) : null}

								{serviceItem.isSelected ? (
									<IcCFtick
										height={25}
										width={25}
										className={styles.tick_icon}
									/>
								) : (
									<IcMPlus
										disabled={loading}
										height={22}
										width={22}
										className={styles.add_icon}
										fill="black"
										onClick={(event) => {
											event.stopPropagation();
											onClickAdd(serviceItem);
										}}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default List;
