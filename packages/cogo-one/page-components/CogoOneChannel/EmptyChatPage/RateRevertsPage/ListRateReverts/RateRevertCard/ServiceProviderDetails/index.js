import { Button, Pill, Popover } from '@cogoport/components';
import { IcMInfo, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import ShipmentInfoDetail from './ShipmentInfoDetail';
import styles from './styles.module.css';

const INDEX_STEP = 1;

function ServiceProviderDetails({
	cardData = {},
	assignData = {},
	setAssignData = () => {},
	shipmentPopover = {},
	setShipmentPopover = () => {},
}) {
	const {
		service_provider = {},
		service_provider_poc = {},
		sources = [],
		id = '',
		shipment_id = '',
	} = cardData || {};

	const {
		category_types = [],
		short_name = '',
		business_name = '',
	} = service_provider || {};

	const { name = '' } = service_provider_poc || {};

	return (
		<div className={styles.container}>
			<div className={styles.service_details}>
				<div className={styles.details_container}>
					<div className={styles.provider_name}>
						{short_name || business_name}
					</div>
					<div className={styles.poc_name}>
						{name}
					</div>
				</div>

				<div className={styles.actions_container}>
					<Pill
						size="sm"
						color="#F7FAEF"
					>
						{startCase(sources)}
					</Pill>

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
							onClick={(e) => {
								e.stopPropagation();
								setShipmentPopover(cardData);
							}}
							className={styles.wrap}
						>
							<IcMInfo className={styles.info_icon} />
						</div>
					</Popover>

					<Popover
						visible={(assignData?.revertDetails?.id === cardData?.id) && assignData?.showPopover}
						placement="bottom"
						interactive
						render={(
							<Button
								themeType="secondary"
								onClick={(e) => {
									e.stopPropagation();
									setAssignData(
										(prev) => ({
											...prev,
											showModal   : true,
											showPopover : false,
										}),
									);
								}}
							>
								Assign
							</Button>
						)}
					>
						<div
							role="presentation"
							onClick={(e) => {
								e.stopPropagation();
								setAssignData(
									(prev) => ({
										...prev,
										revertDetails : isEmpty(prev?.revertDetails) ? cardData : {},
										showPopover   : !prev?.showPopover,
									}),
								);
							}}
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
		</div>
	);
}

export default ServiceProviderDetails;
