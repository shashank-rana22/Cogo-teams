import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCFtick, IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const SERVICE_NAME_MAPPING = {
	fcl_freight           : 'Basic Freight',
	lcl_freight           : 'Basic Freight',
	air_freight           : 'Basic Freight',
	fcl_customs           : 'Customs',
	lcl_customs           : 'Customs',
	air_customs           : 'Customs',
	ftl_freight           : 'FTL Freight',
	ltl_freight           : 'LTL Freight',
	haulage_freight       : 'Haulage Freight',
	trailer_freight       : 'Trailer Freight',
	fcl_freight_local     : 'Locals',
	lcl_freight_local     : 'Locals',
	air_freight_local     : 'Locals',
	rail_domestic_freight : 'Basic Freight',
	fcl_cfs               : 'CFS',
	subsidiary            : 'Subsidiary',
};

function PriceComponent({
	feedback_type = '',
	is_added = false,
	total_price_discounted = 0,
	total_price_currency = '',
}) {
	if (feedback_type === 'request_rate' && is_added) {
		return <div className={styles.price}>Rate Requested</div>;
	}

	if (feedback_type === 'request_rate') {
		return <div className={styles.price}>Request Rates</div>;
	}
	return (

		<div className={styles.price}>
			{formatAmount({
				amount   : total_price_discounted,
				currency : total_price_currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 2,
				},
			})}
		</div>
	);
}

function SelectServices({
	rate = {},
	setSelectedSevice = () => {},
	selectedSevice = {},
}) {
	const { service_rates = {} } = rate;

	const servicesArray = Object.entries(service_rates).reduce(
		(acc, [service_id, cur]) => {
			const {
				service_type = '',
				is_rate_available = false,
				id = '',
				rate_id = '',
				total_price_discounted = 0,
				total_price_currency = '',
				container_size = '',
			} = cur;

			const label = `${SERVICE_NAME_MAPPING[service_type] || startCase(service_type)}
			${container_size ? `${container_size} Ft` : ''}`;

			if (is_rate_available) {
				return [
					...acc,
					{
						feedback_type : 'feedback',
						service_type,
						rate_id       : id || rate_id,
						total_price_currency,
						total_price_discounted,
						service_id,
						container_size,
						is_added      : false,
						label,
					},
				];
			}

			if (!is_rate_available && !service_type.includes('local')) {
				return [
					...acc,
					{
						feedback_type : 'request_rate',
						service_type,
						rate_id       : id || rate_id,
						total_price_currency,
						total_price_discounted,
						service_id,
						container_size,
						is_added      : false,
						label,
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
						// service_type = '',
						// container_size = '',
						service_id = '',
						total_price_currency = '',
						total_price_discounted = 0,
						label = '',
						feedback_type = '',
					} = item;

					const IconElement = is_added ? IcCFtick : IcMPlus;

					return (
						<div
							key={service_id}
							role="presentation"
							className={cl`${styles.tile_container} ${
								selectedSevice.service_id === service_id && styles.active
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
