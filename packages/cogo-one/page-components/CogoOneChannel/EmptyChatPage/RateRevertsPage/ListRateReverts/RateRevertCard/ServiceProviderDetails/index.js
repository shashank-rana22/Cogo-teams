import { Button, Pill, Popover, Tooltip } from '@cogoport/components';
import { IcMInfo, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import AssignModal from './AssignModal';
import ShipmentInfoDetail from './ShipmentInfoDetail';
import styles from './styles.module.css';

const INDEX_STEP = 1;

function ServiceProviderDetails({
	cardData = {}, assignData = {}, setAssignData = () => {},
	// shipmentPopover = {}, setShipmentPopover = () => {},
}) {
	const {
		service_provider = {}, service_provider_poc = {}, sources = [], id = '',
		shipment_id = '', service_type = '',
	} = cardData || {};

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
						{startCase(sources)}
					</Pill>

					{sources.includes('live_booking') ? (
						<Tooltip
							content={(
								<ShipmentInfoDetail
									shipmentId={shipment_id}
									id={id}
									// shipmentPopover={shipmentPopover}
								/>
							)}
							placement="left"
							interactive
							// onClickOutside={() => setShipmentPopover({})}
							// visible={shipmentPopover?.id === id}
							// key={shipmentPopover?.id === id}
						>
							<div
								role="presentation"
								// onClick={() => setShipmentPopover(cardData)}
								className={styles.wrap}
							>
								<IcMInfo className={styles.info_icon} />
							</div>
						</Tooltip>
					) : null}

					<Popover
						placement="bottom"
						interactive
						render={(
							<Button
								themeType="secondary"
								onClick={() => setAssignData((prev) => ({ ...prev, show: true }))}
							>
								Assign
							</Button>
						)}
					>
						<div
							role="presentation"
							onClick={() => setAssignData((prev) => ({ ...prev, revertDetails: cardData }))}
							className={styles.wrap}
						>
							<IcMOverflowDot className={styles.info_icon} />
						</div>
					</Popover>
				</div>
			</div>
			<div className={styles.categories}>
				{category_types?.reduce((acc, itm, index) => (
					`${acc}${startCase(itm)}${index !== category_types.length - INDEX_STEP ? ', ' : ''}`
				), '')}
			</div>

			{assignData?.revertDetails?.id === id
				? (
					<AssignModal
						assignData={assignData}
						setAssignData={setAssignData}
						id={id}
						serviceType={service_type}
					/>
				)
				: null}
		</div>
	);
}

export default ServiceProviderDetails;
