import { cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Item from './Item';
import styles from './styles.module.css';

function Details({ state = '', serviceItemsKey = [], serviceData = {} }) {
	const [show, setShow] = useState(true);

	const {
		container_size,
		shipping_line,
		commodity,
	} = serviceData || {};

	return (
		<>
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

			{show ? (
				<div className={styles.container}>
					{(serviceItemsKey || []).map((element) => (getByKey(serviceData, element.key) ? (
						<Item state={state} label={element} detail={serviceData} />
					) : null))}
				</div>
			) : null}
		</>
	);
}

export default Details;
