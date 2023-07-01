import { IcMPortArrow, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import ServiceStats from '../../../../common/ServiceStats';
import useGetPortCard from '../../../../hooks/useGetPortCard';
import BreakdownDetails from '../BreakdownDetails';

import BreakdownLoading from './BreakdownLoading';
import CommodityMapping from './CommodityMapping';
import LoaderPortsCard from './LoaderPortsCard';
import LocationDetails from './LocationDetails';
import PriceFreightCtr from './PriceFrieghtCtr';
import styles from './styles.module.css';

function PortsCard(props) {
	const {
		loading, Component, origin_port, destination_port, commodity_array,
		stats, freight_price_currency, freight_price_discounted,
		total_price_discounted, priceBreakDown, setPriceBreakDown, id, rfq_card_loading, rate_card_details_data,
		rate, rate_card_details, currency_conversion, editedMargins, setEditedMargins, primaryService,
		convenienceDetails, setConvenienceDetails, updateMargin, refetchRateCards, getRfqsForApproval,
		margin_limit, rfq_state, iconText,
	} = useGetPortCard({ props });

	return (
		<div className={styles.main_container}>
			<div className={styles.port_container}>
				<div className={styles.container}>
					{loading ? <LoaderPortsCard />
						: (
							<>
								<div className={styles.service}>
									{Component && <Component className={styles.icmfcl_icon} />}
									<span className={`${styles[iconText]}`}>{iconText}</span>
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
									<ServiceStats data={stats} source="ports-card" type="card" />
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

					<div
						role="presentation"
						className={styles.down_card_button}
						onClick={() => {
							setPriceBreakDown(isEmpty(priceBreakDown) ? { rfq_rate_card_id: id } : {});
						}}
					>
						{!isEmpty(priceBreakDown) ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
					</div>
				</div>
				{!isEmpty(priceBreakDown) && !rfq_card_loading && !(isEmpty(rate_card_details_data)) && rate && (
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
						setPriceBreakDown={setPriceBreakDown}
						getRfqsForApproval={getRfqsForApproval}
						margin_limit={margin_limit}
						rfq_state={rfq_state}
					/>
				)}
				{rfq_card_loading && <BreakdownLoading />}
			</div>
		</div>
	);
}
export default PortsCard;
