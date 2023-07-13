import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import getShipmentActivityDetails from '../../../../helpers/getShipmentActivityDetails';

import styles from './styles.module.css';

const GET_LAST_ITEM = -1;

function Shipments({ serviceData = {}, eventType = '' }) {
	console.log('serviceData:', serviceData);

	const configarableData = getShipmentActivityDetails({ serviceData, eventType });
	console.log('configarableData:', configarableData);
	const {
		shippingLineUrl = '',
		shippingLineName = '',
		destinationPort = {},
		originPort = {},
	} = configarableData || {};

	console.log('destinationPort:', destinationPort);
	const CHECKOUT_DETAILS = {
		a : '2 Ctr',
		b : '2 Ctr',
		c : '2 Ctr',
		d : '2 Ctr',
		e : '2 Ctr',
	};
	const countryName = (val) => val?.split(',').slice(GET_LAST_ITEM)[GLOBAL_CONSTANTS.zeroth_index];
	return (
		<>
			<div className={styles.title}>Didn’t complete checkout</div>
			<div className={styles.message}>
				Following are the details of the abandoned checkout -
			</div>
			<div className={styles.banner}>
				<div className={styles.company_details}>
					<Image
						src={shippingLineUrl}
						alt="status-icon"
						width={30}
						height={30}
					/>

					<Tooltip
						content={shippingLineName}
						placement="bottom"
					>
						<div className={styles.company_name}>
							{shippingLineName}
						</div>
					</Tooltip>

				</div>

				<div className={styles.port_pair}>
					<div className={styles.port}>
						<div className={styles.port_details}>

							<Tooltip content={startCase(originPort?.name)} placement="bottom">
								<div className={styles.port_name}>
									{startCase(originPort?.name)}
								</div>
							</Tooltip>

							<div className={styles.port_codes}>
								(
								{originPort?.port_code}
								)
							</div>
						</div>

						<div className={styles.country}>
							{startCase(originPort?.country || countryName(originPort?.name))}
						</div>

					</div>
					<IcMPortArrow width={22} height={22} />
					<div className={styles.port}>
						<div className={styles.port_details}>
							<Tooltip content={startCase(destinationPort?.name)} placement="bottom">
								<div className={styles.port_name}>
									{startCase(destinationPort?.name)}
								</div>
							</Tooltip>

							<div className={styles.port_codes}>
								(
								{destinationPort?.port_code}
								)
							</div>
						</div>
						<div className={styles.country}>
							{startCase(destinationPort?.country || countryName(destinationPort?.name))}
						</div>
					</div>
				</div>
				<div className={styles.shipment_details}>
					{Object.entries(CHECKOUT_DETAILS).map(([key, val]) => (
						<div key={key} className={styles.commodity}>
							{val}
						</div>
					))}
					{/* {Object.values(CHECKOUT_DETAILS).map((val, index) => (
						<div key={index} className={styles.commodity}>
							{val}
						</div>
					))} */}
				</div>

				<div className={styles.landed_cost}>
					Landed Cost
				</div>
				<div className={styles.landed_amount}>
					INR 2,65,903.37
				</div>
			</div>

		</>
	);
}

export default Shipments;
