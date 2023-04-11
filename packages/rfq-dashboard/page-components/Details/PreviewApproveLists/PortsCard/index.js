import { Checkbox } from '@cogoport/components';
import { IcMFcl, IcMPortArrow, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import ServiceStats from '../../../../common/ServiceStats';
import { priceBreakupChildData } from '../../../../configurations/price-breakup-card-child-data';
import { PromisedConAndContract } from '../../../../configurations/service-stats-data';

import CommodityMapping from './CommodityMapping';
import LocationDetails from './LocationDetails';
import PriceBreakupCard from './PriceBreakupCard';
import PriceFreightCtr from './PriceFrieghtCtr';
import styles from './styles.module.css';

function PortsCard() {
	const [showPrice, setShowPrice] = useState(false);

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
			<Checkbox
				value="a2"
			/>
			<div className={styles.port_container}>
				<div className={styles.container}>
					<div className={styles.service}>
						<div className={styles.icon_container}>
							<IcMFcl fill="#436DF4" className={styles.icmfcl_icon} />
						</div>
						<div className={styles.service_type}>
							FCL
						</div>
					</div>
					<div className={styles.ports_tags_container}>
						<div className={styles.location_box}>
							<LocationDetails />
							<IcMPortArrow className={styles.icmportarrow_icon} />
							<LocationDetails />
						</div>
						<CommodityMapping />
					</div>
					<div className={styles.service_stats}>
						<ServiceStats data={PromisedConAndContract} />
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
						<IcMArrowRotateDown />
					</button>
				</div>
				{showPrice && (
					<PriceBreakupCard
						priceBreakupChildData={priceBreakupChildData}
						prefilledValues={prefilledValues}
					/>
				)}
			</div>
		</div>
	);
}
export default PortsCard;
