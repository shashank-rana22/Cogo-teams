import React from 'react';

// import EditCancelService from '../../../../EditCancelService';

import styles from './styles.module.css';

function Header({
	service_type = '',
	id = '',
	state = '',
	heading = '',
	service_supply_agent = '',
	serviceData = [],
	serviceList,
	isSeller = false,
	service_provider = '',
	refetchServices = () => {},
	refetchList = () => {},
	shipmentData = {},
}) {
	return (
		<div className={`${state} ${styles.container}`}>
			<div className={styles.heading_wrap}>
				<div>
					<div className={`${styles.heading} ${state}`}>{heading}</div>
					{shipmentData?.stakeholder_types.map((obj) => (obj !== ('booking_agent' || 'sales_agent') ? (
						<div className={`${styles.sub_heading} ${state}`}>
							{service_provider?.business_name}
						</div>
					) : null))}
				</div>

				{/* <EditCancelService
					service_type={service_type}
					id={id}
					state={state}
					isSeller={isSeller}
					serviceData={serviceData}
					serviceList={serviceList}
					refetchServices={refetchServices}
					refetchList={refetchList}
				/> */}
			</div>

			{service_supply_agent ? (
				<div className={`${styles.sub_heading} ${state}`}>{service_supply_agent?.name}</div>
			) : null}
		</div>
	);
}

export default Header;
