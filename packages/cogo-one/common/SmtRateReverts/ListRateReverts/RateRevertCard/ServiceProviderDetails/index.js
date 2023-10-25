import { Pill, Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import { OptionsContainer, SourcesTooltip, TooltipContent } from './serviceProviderHelpers';
import ShipmentInfoDetail from './ShipmentInfoDetail';
import styles from './styles.module.css';

const INDEX_STEP = 1;

function ServiceProviderDetails({
	cardData = {},
	assignData = {},
	setAssignData = () => {},
	shipmentPopover = {},
	setShipmentPopover = () => {},
	isTriggeredFromSideBar = false,
}) {
	const {
		service_provider = {},
		service_provider_poc = {},
		sources = [],
		id = '',
		shipment_id = '',
		serial_id = '',
	} = cardData || {};

	const {
		category_types = [],
		short_name = '',
		business_name = '',
	} = service_provider || {};

	const { name = '' } = service_provider_poc || {};

	const categoryTypes = category_types?.reduce(
		(acc, itm, index) => (
			`${acc}${startCase(itm)}${index !== category_types.length - INDEX_STEP ? ', ' : ''}`
		),
		'',
	);

	const handleClickOutside = () => {
		if ((assignData?.revertDetails?.id === cardData?.id) && assignData?.showPopover) {
			setAssignData(
				(prev) => ({
					...prev,
					revertDetails : {},
					showPopover   : false,
				}),
			);
		}
	};

	const handleClick = (e) => {
		e.stopPropagation();
		setAssignData(
			(prev) => ({
				...prev,
				revertDetails : isEmpty(prev?.revertDetails) ? cardData : {},
				showPopover   : !prev?.showPopover,
			}),
		);
	};

	return (
		<div className={styles.container}>
			<div
				className={cl`${styles.service_details} 
					${isTriggeredFromSideBar ? styles.side_bar_service_details : ''}`}
			>
				<Tooltip
					placement="bottom"
					className={styles.tooltip_container}
					delay={[500, 0]}
					content={<TooltipContent categoryTypes={categoryTypes} cardData={cardData} />}
				>
					<div className={styles.details_container}>
						<div className={styles.provider_name}>
							{short_name || business_name}
						</div>

						<div className={styles.poc_name}>
							{name}
						</div>
					</div>
				</Tooltip>

				{isTriggeredFromSideBar
					? <div className={styles.categories}>{categoryTypes}</div>
					: null}

				<div className={cl`${styles.actions_container} 
					${isTriggeredFromSideBar ? styles.sidebar_actions_container : ''}`}
				>
					<Pill size="sm" color="#F7FAEF">
						TID:
						{' '}
						{serial_id}
					</Pill>

					<Pill size="sm" color="#F7FAEF">
						{startCase(sources?.[GLOBAL_CONSTANTS.zeroth_index])}
					</Pill>

					{sources.length > 1 ? (
						<Tooltip
							placement="bottom"
							delay={[300, 0]}
							content={<SourcesTooltip />}
						>
							<Pill size="sm" color="#F7FAEF">
								+
								{sources.length - 1}
								{' '}
								more
							</Pill>
						</Tooltip>
					) : null}

					<Popover
						placement="left"
						interactive
						onClickOutside={() => setShipmentPopover({})}
						visible={shipmentPopover?.id === id}
						appendTo={() => document.body}
						render={(
							<ShipmentInfoDetail
								shipmentId={shipment_id}
								id={id}
								shipmentPopover={shipmentPopover}
							/>
						)}
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
						onClickOutside={handleClickOutside}
						render={<OptionsContainer setAssignData={setAssignData} />}
					>
						<div
							role="presentation"
							onClick={handleClick}
							className={styles.wrap}
						>
							<IcMOverflowDot className={styles.info_icon} />
						</div>
					</Popover>
				</div>
			</div>

			{isTriggeredFromSideBar
				? null
				: <div className={styles.categories}>{categoryTypes}</div>}
		</div>
	);
}

export default ServiceProviderDetails;
