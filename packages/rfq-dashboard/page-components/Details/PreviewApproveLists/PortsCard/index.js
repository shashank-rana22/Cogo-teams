import { Checkbox } from '@cogoport/components';
import { IcMFcl, IcMPortArrow, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import ServiceStats from '../../../../common/ServiceStats';
import { priceBreakupChildData } from '../../../../configurations/price-breakup-card-child-data';
import { PromisedConAndContract } from '../../../../configurations/service-stats-data';

import CommodityMapping from './CommodityMapping';
import LocationDetails from './LocationDetails';
import PriceBreakupCard from './PriceBreakupCard';
import PriceFreightCtr from './PriceFrieghtCtr';
import styles from './styles.module.css';

function PortsCard(props) {
	const [showPrice, setShowPrice] = useState(false);

	const {
		data = {}, origin_port = [],
		destination_port = [], changeSelection = () => {}, selected = [], isClickable = true, source = '',
	} = props;

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
			{
				isClickable	? (
					<Checkbox
						value="a3"
						checked={selected.find((item) => item.id === data.id)}
						onChange={(e) => changeSelection(data, e.target.checked)}
					/>
				) : <div className={styles.empty_space} />
			}
			<div className={styles.port_container}>
				<div className={styles.container}>
					<div className={styles.service}>
						<div className={styles.icon_container}>
							<IcMFcl fill="#436DF4" className={styles.icmfcl_icon} />
						</div>
						<span className={styles.service_type}>FCL</span>
					</div>
					<div className={styles.ports_tags_container}>
						<div className={styles.location_box}>
							<LocationDetails data={origin_port[0]} source={source} />
							<IcMPortArrow className={styles.icmportarrow_icon} />
							<LocationDetails data={destination_port[0]} source={source} />
						</div>
						<CommodityMapping />
					</div>
					<div className={styles.service_stats}>
						<ServiceStats data={PromisedConAndContract} source="ports-card" />
					</div>
					<div className={styles.price_fright_ctr_section}>
						<PriceFreightCtr />
					</div>

					<button
						className={styles.down_card_button}
						onClick={() => {
							setShowPrice(!showPrice);
						}}
					>
						{showPrice ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
					</button>
				</div>
				{/* {showPrice && ( */}
				<PriceBreakupCard
					priceBreakupChildData={priceBreakupChildData}
					prefilledValues={prefilledValues}
					showPrice={showPrice}
				/>
				{/* )} */}
			</div>
		</div>
	);
}
export default PortsCard;
