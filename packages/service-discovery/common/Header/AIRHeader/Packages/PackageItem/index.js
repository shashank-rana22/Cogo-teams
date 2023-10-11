import { Popover, Tooltip } from '@cogoport/components';
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
}) {
	const { commodity = '', commodity_details = [], total_volume = 1, total_weight = 1 } = loadItem;

	const { commodity_type = '' } = commodity_details[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={styles.container}>
			<div className={styles.load_item}>
				<span className={styles.text}>
					{total_volume}
					{' '}
					CBM
					{', '}
					{total_weight}
					{' '}
					KG
				</span>

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

			<div className={styles.load_item} style={{ marginLeft: 12 }}>
				<span className={styles.text}>
					{startCase(commodity === 'general' ? commodity : commodity_type)}
				</span>
			</div>

			<div className={styles.load_item} style={{ margin: '0 12px' }}>
				<Tooltip
					placement="top"
					content={(
						<div className={styles.tooltip_content}>
							Chargeable Weight:
							{' '}
							<strong>
								{chargeable_weight}
								{' '}
								{' '}
								Kgs
							</strong>
							<br />
							( 1CBM = 166.67kgs )
						</div>
					)}
				>
					<span className={styles.text}>
						{chargeable_weight}
						{' '}
						Kgs
					</span>
				</Tooltip>
			</div>
		</div>
	);
}

export default PackageItem;
