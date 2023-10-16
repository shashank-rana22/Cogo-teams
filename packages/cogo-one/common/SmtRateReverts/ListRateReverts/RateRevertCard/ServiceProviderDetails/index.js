import { Button, Pill, Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
	isTriggeredFromSideBar = false,
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
			<div
				className={cl`${styles.service_details} 
					${isTriggeredFromSideBar ? styles.side_bar_service_details : ''}`}
			>
				<Tooltip
					placement="bottom"
					className={styles.tooltip_container}
					delay={[500, 0]}
					content={(
						<>
							<div className={styles.tooltip_data}>
								<span>Service Provider :</span>
								{short_name || business_name || '-'}
							</div>
							<div className={styles.tooltip_data}>
								<span>Service Provider Poc :</span>
								{name || '-'}
							</div>
						</>
					)}
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
					? (
						<div className={styles.categories}>
							{category_types?.reduce(
								(acc, itm, index) => (
									`${acc}${startCase(itm)}${index !== category_types.length - INDEX_STEP ? ', ' : ''}`
								),
								'',
							)}
						</div>
					)
					: null}

				<div className={cl`${styles.actions_container} 
					${isTriggeredFromSideBar ? styles.sidebar_actions_container : ''}`}
				>
					<Pill
						size="sm"
						color="#F7FAEF"
					>
						{startCase(sources?.[GLOBAL_CONSTANTS.zeroth_index])}
					</Pill>

					{sources.length > 1 ? (
						<Tooltip
							placement="bottom"
							delay={[300, 0]}
							content={((sources?.slice(1) || [])?.map(
								(itm) => (
									<Pill
										key={itm}
										size="sm"
										color="#F7FAEF"
									>
										{startCase(itm)}
									</Pill>
								),
							)
							)}
						>
							<Pill
								size="sm"
								color="#F7FAEF"
							>
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
						onClickOutside={() => {
							if ((assignData?.revertDetails?.id === cardData?.id) && assignData?.showPopover) {
								setAssignData(
									(prev) => ({
										...prev,
										revertDetails : {},
										showPopover   : false,
									}),
								);
							}
						}}
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

			{isTriggeredFromSideBar
				? null
				: (
					<div className={styles.categories}>
						{category_types?.reduce(
							(acc, itm, index) => (
								`${acc}${startCase(itm)}${index !== category_types.length - INDEX_STEP ? ', ' : ''}`
							),
							'',
						)}
					</div>
				)}
		</div>
	);
}

export default ServiceProviderDetails;
