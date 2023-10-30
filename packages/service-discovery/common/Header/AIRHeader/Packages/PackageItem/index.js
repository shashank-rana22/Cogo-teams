import { Popover, Tooltip } from '@cogoport/components';
import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import InfoBannerContent from '../../../../InfoBannerContent';

import styles from './styles.module.css';

function PackageItem({
	isAllowedToEdit = false,
	loadItem = {},
	totalBanners = 0,
	showPopover = false,
	popoverComponentData = {},
	setShowModal = () => {},
	setInfoBanner = () => {},
	chargeable_weight = 0,
	isMobile = false,
}) {
	const { commodity = '', commodity_details = [], total_volume = 1, total_weight = 1, total_quantity = 1 } = loadItem;

	const { commodity_type = '', commodity_subtype = '' } = commodity_details[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={styles.load_item}>
			<Tooltip content={(
				<span className={styles.tooltip_content}>
					Packages Count:
					{' '}
					<strong>{total_quantity}</strong>
					<br />
					Volume:
					{' '}
					<strong>
						{total_volume}
						{' '}
						CBM
					</strong>
					<br />
					Weight:
					{' '}
					<strong>
						{total_weight}
						{' '}
						KG
					</strong>
					<br />
					Chargeable weight:
					{' '}
					<strong>
						{chargeable_weight}
						{' '}
						KG
					</strong>
					<br />
					{' '}
					Commodity:
					{' '}
					<strong>{startCase(commodity === 'general' ? commodity : commodity_type)}</strong>
					<br />
					{' '}
					Commodity Subtype:
					{' '}
					<strong>
						{COMMODITY_NAME_MAPPING[commodity_subtype] || startCase(commodity_subtype) || 'All'}
					</strong>
				</span>
			)}
			>
				{isMobile ? (
					<span className={styles.text}>
						<strong>{total_quantity}</strong>
						{' X '}
						<strong>
							{total_volume}
							{' '}
							CBM
						</strong>
						{', '}
						<strong>
							{total_weight}
							{' '}
							KG
						</strong>
					</span>
				) : (
					<span className={styles.text}>
						Count:
						{' '}
						<strong>{total_quantity}</strong>
						{', '}
						Volume:
						{' '}
						<strong>
							{total_volume}
							{' '}
							CBM
						</strong>
						{', '}
						Weight:
						{' '}
						<strong>
							{total_weight}
							{' '}
							KG
						</strong>
						{', '}
						CW:
						{' '}
						<strong>
							{chargeable_weight}
							{' '}
							KG
						</strong>
						{', '}
						<strong>{startCase(commodity === 'general' ? commodity : commodity_type)}</strong>
					</span>
				)}
			</Tooltip>

			{isAllowedToEdit ? (
				<Popover
					placement="bottom"
					caret
					render={(
						<InfoBannerContent
							popoverComponentData={popoverComponentData}
							totalBanners={totalBanners}
							setInfoBanner={setInfoBanner}
						/>
					)}
					visible={showPopover}
				>
					<IcMEdit
						height={12}
						width={12}
						className={styles.edit}
						onClick={() => setShowModal(true)}
					/>
				</Popover>
			) : null}
		</div>
	);
}

export default PackageItem;
