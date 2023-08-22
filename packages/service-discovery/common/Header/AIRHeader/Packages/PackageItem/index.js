import { Popover } from '@cogoport/components';
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
	const { commodity = '', total_volume = 1, total_weight = 1 } = loadItem;

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

			<div className={styles.load_item} style={{ margin: '0 12px' }}>
				<span className={styles.text}>
					{startCase(commodity) || 'All Commodities'}
				</span>
			</div>
		</div>
	);
}

export default PackageItem;
