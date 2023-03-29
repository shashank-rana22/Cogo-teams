import { cl } from '@cogoport/components';
import React from 'react';

// import EditCancelService from './EditCancelService';
import styles from './styles.module.css';

function Header({
	service_type = '',
	id = '',
	state = '',
	heading = '',
	supply_agent = {},
	serviceData = [],
	servicesList,
	isSeller = false,
	service_provider = {},
	refetchServices = () => {},
	refetchList = () => {},
	shipmentData = {},
}) {
	console.log(heading, 'headingggg', state);

	return (
		<div className={cl`${state} ${styles.container}`}>
			<div className={styles.heading_wrap}>
				<div>
					<div className={cl`${styles.heading} ${state}`}>{heading}</div>
					<div className={cl`${styles.sub_heading} ${state}`}>
						{service_provider?.business_name}
					</div>
				</div>

				{/* <EditCancelService
					service_type={service_type}
					id={id}
					state={state}
					isSeller={isSeller}
					serviceData={serviceData}
					servicesList={servicesList}
					refetchServices={refetchServices}
					refetchList={refetchList}
					shipmentData={shipmentData}
				/> */}
			</div>
			{/*
			{supply_agent?.name ? (
				<div className={cl`${styles.sub_heading} ${state}`}>{supply_agent?.name}</div>
			) : null} */}
		</div>
	);
}

export default Header;
