import { cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getConfigs from '../../configurations/get-configs';
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
	} = serviceData || {};

	const service_items_key = getConfigs(service_type).details || {};

	const addedServiceComponent = () => (
		<>
			{allSimilar > 1 ? (
				<div
					onClick={() => setShow(!show)}
					className={cl`${styles.expander} ${styles.state}`}
					role="button"
					tabIndex={0}
				>
					<div className={styles.card_details}>
						{container_size}
							&nbsp;
						{shipping_line?.business_name}
						{startCase(commodity)}
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
						serviceItemsKey={service_items_key}
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
