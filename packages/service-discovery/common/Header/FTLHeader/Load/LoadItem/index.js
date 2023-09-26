import { Popover, cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import InfoBannerContent from '../../../../InfoBannerContent';

import styles from './styles.module.css';

function LoadItem({
	isAllowedToEdit = false,
	loadItem = {},
	totalBanners = 0,
	showPopover = false,
	popoverComponentData = {},
	setShowModal = () => {},
	setInfoBanner = () => {},
	margin = 0,
}) {
	const { commodity = '', trucks_count = 0, truck_type = '', volume = 0, weight = 0 } = loadItem;

	const toShowTruckDetails = truck_type;

	return (
		<div className={styles.container} style={{ margin }}>
			<div className={cl`${styles.load_item} ${toShowTruckDetails && styles.horizontal_margin}`}>
				{(toShowTruckDetails) ? (
					<span className={styles.text}>
						{trucks_count}
						{' X '}
						{startCase(truck_type)}
					</span>
				) : (
					<span className={styles.text}>
						{volume}
						{' '}
						CBM
						{', '}
						{weight}
						{' '}
						KG
					</span>
				)}

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

			{commodity ? (
				<div className={cl`${styles.load_item} ${styles.horizontal_margin}`}>
					<span className={styles.text}>
						{startCase(commodity)}
					</span>
				</div>
			) : null}
		</div>
	);
}

export default LoadItem;
