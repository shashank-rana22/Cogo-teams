import { Popover, Tooltip, cl } from '@cogoport/components';
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

	return (
		<div className={styles.container} style={{ margin }}>
			<div className={styles.load_item}>
				{truck_type ? (
					<Tooltip
						placement="bottom"
						content={(
							<div className={styles.text}>
								{trucks_count}
								{' X '}
								{startCase(truck_type)}
							</div>
						)}
					>
						<div className={cl`${styles.text} ${isAllowedToEdit && styles.overflow}`}>
							{trucks_count}
							{' X '}
							{startCase(truck_type)}
						</div>
					</Tooltip>
				) : (
					<span className={styles.text}>
						{volume}
						{' '}
						CBM
						{', '}
						{weight}
						{' '}
						Tons
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
				<div className={styles.load_item}>
					<Tooltip
						placement="bottom"
						content={(
							<div className={styles.text}>
								{startCase(commodity)}
							</div>
						)}
					>
						<div className={cl`${styles.text} ${isAllowedToEdit && styles.overflow}`}>
							{startCase(commodity)}
						</div>
					</Tooltip>
				</div>
			) : null}
		</div>
	);
}

export default LoadItem;
