import { Popover } from '@cogoport/components';
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
}) {
	const { commodity = '', commodity_details = [], total_volume = 1, total_weight = 1, total_quantity = 1 } = loadItem;

	const { commodity_type = '' } = commodity_details[GLOBAL_CONSTANTS.zeroth_index] || {};

	return (
		<div className={styles.load_item}>
			<span className={styles.text}>
				count:
				{' '}
				<strong>{total_quantity}</strong>
				{', '}
				volume:
				{' '}
				<strong>
					{total_volume}
					{' '}
					CBM
				</strong>
				{', '}
				weight:
				{' '}
				<strong>
					{total_weight}
					{' '}
					KG
				</strong>
				{', '}
				<strong>{startCase(commodity === 'general' ? commodity : commodity_type)}</strong>
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
	);
}

export default PackageItem;
