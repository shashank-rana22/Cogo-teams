import { Checkbox } from '@cogoport/components';
import { IcMFcl, IcMPortArrow, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ServiceStats from '../../../../common/ServiceStats';
import { priceBreakupChildData } from '../../../../configurations/price-breakup-card-child-data';
import { PromisedConAndContract } from '../../../../configurations/service-stats-data';
import useGetRfqRateCardDetails from '../../../../hooks/useGetRfqRateCardDetails';
import BreakdownDetails from '../BreakdownDetails';

import CommodityMapping from './CommodityMapping';
import LoaderPortsCard from './LoaderPortsCard';
import LocationDetails from './LocationDetails';
import PriceBreakupCard from './PriceBreakupCard';
import PriceFreightCtr from './PriceFrieghtCtr';
import styles from './styles.module.css';

const COMMODITY_MAPPING = ['cargo_weight_per_container', 'commodity',
	'container_size', 'container_type', 'containers_count'];

function PortsCard(props) {
	const { data = {}, loading } = props;

	const [showPrice, setShowPrice] = useState(false);

	const {
		detail = {}, freight_price_currency = '', freight_price_discounted = '',
		total_price_discounted = '', id = '',
	} = data;

	console.log('data::', data);

	console.log('freight_price_currency::', freight_price_currency);

	const {
		origin_port = {}, destination_port = {},
	} = detail;

	const commodity_array = [];

	COMMODITY_MAPPING.map((commodity) => commodity_array.push({ [commodity]: detail[commodity] }));

	const [editedMargins, setEditedMargins] = useState({});

	const currency_conversion = {};

	const {
		getRfqRateCardDetails, rfq_card_loading,
		rate_card_details_data,
	} = useGetRfqRateCardDetails({ rfq_rate_card_id: showPrice.rfq_rate_card_id });

	useEffect(() => {
		if (isEmpty(showPrice)) {
			getRfqRateCardDetails();
		}
	}, [showPrice]);

	console.log('rate_card_details_data::', rate_card_details_data);

	// const {
	// 	data = {}, origin_port = [],
	// 	destination_port = [], changeSelection = () => {}, selected = [], isClickable = true, source = '', loading,
	// } = props;

	// const {}

	const prefilledValues = [];
	priceBreakupChildData?.forEach((item) => {
		item?.data.forEach((dataItem) => {
			prefilledValues.push({
				margin_type           : dataItem.margin_type,
				margin_value_currency : dataItem.margin_value_currency,
				margin_value          : dataItem.margin_value,
			});
		});
	});

	return (
		<div className={styles.main_container}>
			{/* {
				isClickable	? (
					<Checkbox
						value="a3"
						checked={selected.find((item) => item.id === data.id)}
						onChange={(e) => changeSelection(data, e.target.checked)}
						disabled={loading}
					/>
				) : <div className={styles.empty_space} />
			} */}
			<div className={styles.port_container}>
				<div className={styles.container}>
					{loading ? <LoaderPortsCard />
						: (
							<>
								<div className={styles.service}>
									<IcMFcl fill="#436DF4" className={styles.icmfcl_icon} />
									<span className={styles.service_type}>FCL</span>
								</div>
								<div className={styles.ports_tags_container}>
									<div className={styles.location_box}>
										<LocationDetails data={origin_port} source="origin" />
										<IcMPortArrow className={styles.icmportarrow_icon} />
										<LocationDetails data={destination_port} source="destination" />
									</div>
									<CommodityMapping commodity_array={commodity_array} />
								</div>
								<div className={styles.service_stats}>
									<ServiceStats data={PromisedConAndContract} source="ports-card" />
								</div>
								<div className={styles.price_fright_ctr_section}>
									<PriceFreightCtr
										freight_price_currency={freight_price_currency}
										freight_price_discounted={freight_price_discounted}
										total_price_discounted={total_price_discounted}
									/>
								</div>
							</>
						)}

					<button
						className={styles.down_card_button}
						onClick={() => {
							setShowPrice(isEmpty(showPrice) ? { rfq_rate_card_id: id } : {});
						}}
					>
						{showPrice ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
					</button>
				</div>
				{showPrice && (
					<PriceBreakupCard
						priceBreakupChildData={priceBreakupChildData}
						prefilledValues={prefilledValues}
						showPrice={showPrice}
						loading={loading}
					/>

				// <BreakdownDetails
				// 	editedMargins={editedMargins}
				// 	setEditedMargins={setEditedMargins}
				// 	conversions={currency_conversion}
				// 	detail={details}
				// 	rate={rate}
				// 	primaryService={primaryService}
				// 	convenienceDetails={convenienceDetails}
				// 	setConvenienceDetails={setConvenienceDetails}
				// />
				)}
			</div>
		</div>
	);
}
export default PortsCard;
