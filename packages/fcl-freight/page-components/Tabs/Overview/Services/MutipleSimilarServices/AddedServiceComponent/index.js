import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

// import getConfigs from '../../../../../configurations/Supplier/get-configs';
import CreateNew from '../../ServiceDetails/CreateNew';
import Details from '../../ServiceDetails/Details';

import styles from './styles.module.css';

function AddedServiceComponent({
	serviceData = {},
	serviceList = [],
	shipmentData = {},
	isMain = false,
	allSimilar,
	routeLeg,
}) {
	const [show, setShow] = useState(allSimilar === 1);

	const {
		id,
		service_type,
		state,
		container_size,
		shipping_line,
		commodity,
		commodity_subtype,
		cargo_weight_per_container,
	} = serviceData || {};

	// const service_items_key = getConfigs(service_type).details || {};

	const addedServiceComponent = () => (
		<>
			{allSimilar > 1 ? (
				<div
					onClick={() => setShow(!show)}
					className={`${styles.expander} ${state}`}
					role="button"
					tabIndex={0}
				>
					<div>
						<div className={styles.card_details}>
							{container_size}
							{' '}
							{shipping_line?.business_name}
							{' '}
							{startCase(commodity)}
						</div>
						{service_type === 'rail_domestic_freight_service' ? (
							<div className={styles.card_sub_details}>
								{startCase(commodity_subtype)}
								,
								{`${startCase(cargo_weight_per_container)}MT`}
							</div>
						) : null}
					</div>

					{show ? (
						<IcMArrowRotateUp style={{ margin: 'inherit' }} />
					) : (
						<IcMArrowRotateDown style={{ margin: 'inherit' }} />
					)}
				</div>
			) : null}

			{show ? (
				<div className={styles.container}>
					<Details
						state={state}
						// serviceItemsKey={service_items_key}
						service_data={serviceData}
					/>
				</div>
			) : null}
		</>
	);

	if ((isMain && isEmpty(id)) || state) {
		return addedServiceComponent();
	}

	return (
		<CreateNew
			routeLeg={routeLeg}
			serviceList={serviceList}
			shipment_data={shipmentData}
		/>
	);
}

export default AddedServiceComponent;
