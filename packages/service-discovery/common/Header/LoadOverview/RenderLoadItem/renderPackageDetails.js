import { Popover } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import InfoBannerContent from '../../../InfoBannerContent';

import styles from './styles.module.css';

const renderPackageDetails = ({
	isAllowedToEdit = false,
	loadItem = {},
	totalBanners = 0,
	showPopover = false,
	popoverComponentData = {},
	setShowModal = () => {},
	isFirst = false,
	margin = 0,
}) => (
	<div className={styles.container} style={{ margin }}>
		<div className={styles.load_item}>
			<span className={styles.text}>
				{`${loadItem.packages_count} X ${loadItem.volume} CBM`}
			</span>

			{isAllowedToEdit && isFirst ? (
				<Popover
					placement="bottom"
					caret
					render={(
						<InfoBannerContent
							popoverComponentData={popoverComponentData}
							totalBanners={totalBanners}
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
				{startCase(loadItem.commodity) || 'All Commodities'}
			</span>
		</div>
	</div>
);

export default renderPackageDetails;
