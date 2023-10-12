import { Pill, Popover } from '@cogoport/components';
import { IcMInfo, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import ShipmentInfoDetail from './ShipmentInfoDetail';
import styles from './styles.module.css';

const INDEX_STEP = 1;

function ServiceProviderDetails({
	cardData = {},
	shipmentPopover = {}, setShipmentPopover = () => {},
}) {
	const { service_provider = {}, service_provider_poc = {}, source = '', id = '', shipment_id = '' } = cardData || {};

	const { category_types = [], short_name = '', business_name = '' } = service_provider || {};
	const { name = '' } = service_provider_poc || {};

	return (
		<div className={styles.container}>
			<div className={styles.service_details}>
				<div className={styles.details_container}>
					<div className={styles.provider_name}>{short_name || business_name}</div>
					<div className={styles.poc_name}>{name}</div>
				</div>
				<div className={styles.actions_container}>
					<Pill
						size="sm"
						color="#F7FAEF"
					>
						{startCase(source)}
					</Pill>

					{source === 'live_booking' ? (
						<Popover
							render={(
								<ShipmentInfoDetail
									shipmentId={shipment_id}
									id={id}
									shipmentPopover={shipmentPopover}
								/>
							)}
							placement="left"
							interactive
							onClickOutside={() => setShipmentPopover({})}
							visible={shipmentPopover?.id === id}
						>
							<div
								role="presentation"
								onClick={() => setShipmentPopover(cardData)}
								className={styles.wrap}
							>
								<IcMInfo className={styles.info_icon} />
							</div>
						</Popover>
					) : null}

					<Popover>
						<IcMOverflowDot className={styles.info_icon} />
					</Popover>
				</div>
			</div>
			<div className={styles.categories}>
				{category_types?.reduce((acc, itm, index) => (
					`${acc}${startCase(itm)}${index !== category_types.length - INDEX_STEP ? ', ' : ''}`
				), '')}
			</div>
		</div>
	);
}

export default ServiceProviderDetails;
