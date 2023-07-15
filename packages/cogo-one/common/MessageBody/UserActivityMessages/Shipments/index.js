import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Shipments({ serviceData = {} }) {
	return (
		<>
			{/* <div className={styles.title}>{evnetTitle}</div> */}
			<div className={styles.message}>
				Following are the details of the abandoned shipments -
			</div>

			{/* <div className={styles.company_details}>
				<Image
					src={shippingLineUrl}
					alt="status-icon"
					width={30}
					height={30}
				/>

				<Tooltip content={shippingLineName} placement="bottom">
					<div className={styles.company_name}>
						{shippingLineName}
					</div>
				</Tooltip>
			</div> */}

			<PortDetails serviceData={serviceData} />
			{/* <div className={styles.banner}>
				<div className={styles.company_details}>
					<Image
						src={shippingLineUrl}
						alt="status-icon"
						width={30}
						height={30}
					/>

					<Tooltip content={shippingLineName} placement="bottom">
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
					{Object.values(CHECKOUT_DETAILS).map((val, index) => (
						<div key={index} className={styles.commodity}>
							{val}
						</div>
					))}
				</div>

				<div className={styles.landed_cost}>
					Landed Cost
				</div>
				<div className={styles.landed_amount}>
					INR 2,65,903.37
				</div>
			</div> */}

		</>
	);
}

export default Shipments;
