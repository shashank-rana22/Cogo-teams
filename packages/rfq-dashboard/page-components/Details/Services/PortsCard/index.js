import { IcMFcl, IcMPortArrow, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import ServiceStats from '../../../../common/ServiceStats';
import { priceBreakupChildData } from '../../../../configurations/price-breakup-card-child-data';
import { PromisedConAndContract } from '../../../../configurations/service-stats-data';
import useGetRfqRateCardDetails from '../../../../hooks/useGetRfqRateCardDetails';
import useUpdateRfqRateMargin from '../../../../hooks/useUpdateRfqRateMargin';
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
	const { data = {}, loading, refetchRateCards } = props;

	const [showPrice, setShowPrice] = useState({});

	const {
		detail = {}, freight_price_currency = '', freight_price_discounted = '',
		total_price_discounted = '', id = '', stats = {},
	} = data;

	const {
		origin_port = {}, destination_port = {},
	} = detail;

	const commodity_array = [];

	COMMODITY_MAPPING.map((commodity) => commodity_array.push({ [commodity]: detail[commodity] }));

	const {
		getRfqRateCardDetails, rfq_card_loading,
		rate_card_details_data,
	} = useGetRfqRateCardDetails();

	useEffect(() => {
		if (!isEmpty(showPrice)) {
			getRfqRateCardDetails({ rfq_rate_card_id: showPrice?.rfq_rate_card_id });
		}
	}, [getRfqRateCardDetails, showPrice]);

	const { rate = {}, detail: rate_card_details = {}, currency_conversion = {} } = rate_card_details_data || {};

	const convenience_line_item = rate?.booking_charges?.convenience_rate?.line_items[0];

	const [editedMargins, setEditedMargins] = useState({});

	const [convenienceDetails, setConvenienceDetails] = useState({
		convenience_rate: {
			price    : convenience_line_item?.price,
			currency : convenience_line_item?.currency,
			unit     : convenience_line_item?.unit,
		},
	});

	console.log('convenienceDetails::', convenienceDetails);

	const primary_service_id = rate_card_details?.primary_service_id;
	const primaryService = {
		...(rate_card_details?.service_details?.[primary_service_id] || {}),
		rate: rate?.service_rates?.[primary_service_id] || {},
	};

	const { updateMargin } = useUpdateRfqRateMargin({
		rate,
		rate_card_details,
	});

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
									<ServiceStats data={stats} source="ports-card" />
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
				{!isEmpty(showPrice) && !rfq_card_loading && !(isEmpty(rate_card_details_data)) && (
				// <PriceBreakupCard
				// 	priceBreakupChildData={priceBreakupChildData}
				// 	prefilledValues={prefilledValues}
				// 	showPrice={showPrice}
				// 	loading={loading}
				// />
					<BreakdownDetails
						rate={rate}
						detail={rate_card_details}
						conversions={currency_conversion}
						editedMargins={editedMargins}
						setEditedMargins={setEditedMargins}
						primaryService={primaryService}
						convenienceDetails={convenienceDetails}
						setConvenienceDetails={setConvenienceDetails}
						updateMargin={updateMargin}
						rfq_rate_card_id={id}
						refetchRateCards={refetchRateCards}
						setShowPrice={setShowPrice}
					/>
				)}
			</div>
		</div>
	);
}
export default PortsCard;
