import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import reorderServiceRates from '../../../../../../../../../helpers/reorderServiceRates';

import styles from './styles.module.css';

const SERVICE_NAME_MAPPING = {
	fcl_freight           : 'Basic Freight',
	lcl_freight           : 'Basic Freight',
	air_freight           : 'Basic Freight',
	fcl_customs           : 'FCL Customs',
	lcl_customs           : 'LCL Customs',
	air_customs           : 'AIR Customs',
	ftl_freight           : 'FTL Freight',
	ltl_freight           : 'LTL Freight',
	haulage_freight       : 'Haulage Freight',
	trailer_freight       : 'Trailer Freight',
	fcl_freight_local     : 'FCL Local',
	lcl_freight_local     : 'LCL Local',
	air_freight_local     : 'AIR Local',
	rail_domestic_freight : 'Basic Freight',
	fcl_cfs               : 'FCL CFS',
	subsidiary            : 'Subsidiary',
};

const TRADE_TYPE_MAPPING = {
	import : 'Destination',
	export : 'Origin',
};

const MAPPING = {
	fcl_freight     : 'per Cont',
	lcl_freight     : 'per Cont',
	air_freight     : 'per Kg',
	ftl_freight     : 'per Truck',
	trailer_freight : 'per Trailer',
};

const getFreightprice = ({
	service_type = '',
	primary_service = '',
	freight_price_discounted = 0,
	cur = {},
	chargeable_weight = 0,
}) => {
	const {
		total_price_discounted = 0,
		containers_count = 1,
		trucks_count,
		trailer_count,
	} = cur;

	if (service_type !== primary_service && ['ftl_freight', 'trailer_freight'].includes(service_type)) {
		return total_price_discounted / (trucks_count || trailer_count || 1);
	}

	if (service_type !== primary_service) {
		return total_price_discounted;
	}

	if (['fcl_freight', 'lcl_freight'].includes(service_type)) {
		return freight_price_discounted / containers_count;
	}

	if (['ftl_freight', 'trailer_freight'].includes(service_type)) {
		return freight_price_discounted / (trucks_count || trailer_count || 1);
	}

	if (service_type === 'air_freight') {
		return freight_price_discounted / chargeable_weight;
	}

	return freight_price_discounted;
};

function PriceComponent({
	feedback_type = '',
	is_added = false,
	freight_price_discounted = 0,
	freight_price_currency = '',
	unit = '',
}) {
	if (feedback_type === 'request_rate' && is_added) {
		return <div className={styles.price}>Rate Requested</div>;
	}

	if (feedback_type === 'request_rate') {
		return <div className={styles.price}>Request Rates</div>;
	}

	const formattedAmount = formatAmount({
		amount   : freight_price_discounted,
		currency : freight_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div className={styles.price}>
			{formattedAmount}
			{' '}
			(
			{unit}
			)
		</div>
	);
}

function SelectServices({
	rate = {},
	setSelectedSevice = () => {},
	selectedSevice = {},
	data = {},
	rateRequestedFor = [],
	primary_service = '',
	chargeable_weight = 1,
}) {
	const {
		service_rates = {},
		freight_price_discounted = 0,
		freight_price_currency = '',
	} = rate;

	const updatedServiceRates = useMemo(
		() => reorderServiceRates({
			service_type   : primary_service,
			service_rates,
			tradeTypeOrder : ['main', 'export', 'import', 'other'],
		}),
		[service_rates, primary_service],
	);

	const servicesArray = updatedServiceRates.reduce(
		(acc, cur) => {
			const {
				service_type = '',
				is_rate_available = false,
				rate_id = '',
				total_price_currency = '',
				container_size = '',
				id = '',
				trade_type = '',
				key: service_id = '',
			} = cur;

			let label = `${SERVICE_NAME_MAPPING[service_type] || startCase(service_type)}
			${container_size ? `${container_size} Ft` : ''}`;

			if (trade_type) {
				label = `${TRADE_TYPE_MAPPING[trade_type]} ${label}`;
			}

			const finalPrice = getFreightprice({
				service_type,
				primary_service,
				freight_price_discounted,
				cur,
				chargeable_weight,
			});

			if (is_rate_available) {
				return [
					...acc,
					{
						feedback_type            : 'feedback',
						service_type,
						rate_id                  : rate_id || id,
						service_id,
						container_size,
						is_added                 : data[service_id],
						label,
						selected_card            : rate.id,
						service_data             : cur,
						unit                     : MAPPING[service_type] || 'Total',
						freight_price_discounted : finalPrice,
						freight_price_currency   : service_type === primary_service
							? freight_price_currency : total_price_currency,
					},
				];
			}

			if (!is_rate_available && !service_type.includes('local')) {
				return [
					...acc,
					{
						feedback_type : 'request_rate',
						service_type,
						rate_id       : rate_id || id,
						service_id,
						container_size,
						is_added      : rateRequestedFor.includes(service_id),
						label,
						selected_card : rate.id,
						service_data  : cur,
					},
				];
			}

			return acc;
		},
		[],
	);

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Select Service you want to provide Feedback on:
			</div>

			<div className={styles.services_tiles}>
				{servicesArray.map((item) => {
					const {
						is_added = false,
						service_id = '',
						total_price_currency = '',
						total_price_discounted = 0,
						label = '',
						feedback_type = '',
						freight_price_discounted: price,
						freight_price_currency: currency,
						unit,
					} = item;

					const IconElement = is_added ? IcCFtick : IcMPlus;

					return (
						<div
							key={service_id}
							role="presentation"
							className={cl`${styles.tile_container} ${
								selectedSevice.service_id === service_id && styles.active
							} ${
								is_added && styles.added
							}`}
							onClick={() => setSelectedSevice(item)}
						>
							<div className={styles.service_name}>
								{label}
							</div>

							<PriceComponent
								feedback_type={feedback_type}
								is_added={is_added}
								total_price_discounted={total_price_discounted}
								total_price_currency={total_price_currency}
								freight_price_discounted={price}
								freight_price_currency={currency}
								unit={unit}
							/>

							<IconElement
								className={styles.icon}
								height={is_added ? 14 : 12}
								width={is_added ? 14 : 12}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SelectServices;
