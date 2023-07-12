import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
// import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CheckoutIncomplete() {
	const CHECKOUT_DETAILS = {
		a : '2 Ctr',
		b : '2 Ctr',
		c : '2 Ctr',
		d : '2 Ctr',
		e : '2 Ctr',
	};

	return (
		<>
			<div className={styles.title}>Didn’t complete checkout</div>
			<div className={styles.message}>
				Following are the details of the abandoned checkout -
			</div>
			<div className={styles.banner}>
				<div className={styles.company_details}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.login_failed}
						alt="status-icon"
						width={25}
						height={25}
					/>

					<Tooltip
						content="hello"
						placement="bottom"
					>
						<div className={styles.company_name}>
							Cosco Shipping Cosco Shipping Cosco Shipping Cosco Shipping
						</div>
					</Tooltip>

				</div>

				<div className={styles.port_pair}>
					<div className={styles.port}>
						<div className={styles.port_details}>

							{/* <Tooltip content={startCase(origin_port?.name)} placement="bottom">
								<div className={styles.port_name}>
									{startCase(origin_port?.name)}
								</div>
							</Tooltip> */}
							<Tooltip content="jk" placement="bottom">
								<div className={styles.port_name}>
									nkdmmckcmkmkemc ecnekmkemkemke keekmkemde jnekm
								</div>
							</Tooltip>

							<div className={styles.port_codes}>
								{/* {!isEmpty(origin_port?.port_code) && (
										<> */}
								(
								{/* {origin_port?.port_code} */}
								INDIA
								)
								{/* </>
									 )} */}

							</div>
						</div>
						<div className={styles.country}>
							{/* {startCase(countryName(origin_port?.display_name))} */}
							INDIA
						</div>
					</div>
					<IcMPortArrow width={22} height={22} />
					<div className={styles.port}>
						<div className={styles.port_details}>
							{/* <Tooltip content={startCase(destination_port?.name)} placement="bottom">
								<div className={styles.port_name}>
									{startCase(destination_port?.name)}
								</div>
							</Tooltip> */}
							<Tooltip content="hello" placement="bottom">
								<div className={styles.port_name}>
									{/* {startCase(destination_port?.name)} */}
									bdehbdebdbdjeebhecbhebeb
								</div>
							</Tooltip>
							<div className={styles.port_codes}>
								{/* {!isEmpty(destination_port?.port_code) && (
									<> */}
								(
								{/* {destination_port?.port_code} */}
								HUYJG
								)
								{/* </>
								)} */}
							</div>
						</div>
						<div className={styles.country}>
							{/* {startCase(countryName(origin_port?.display_name))} */}
							INDINATIA
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

export default CheckoutIncomplete;
