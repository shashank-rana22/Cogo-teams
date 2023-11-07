import { Popover } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import InfoBannerContent from '../../../../InfoBannerContent';

import styles from './styles.module.css';

function ContainerItem({
	isAllowedToEdit = false,
	loadItem = {},
	totalBanners = 0,
	showPopover = false,
	popoverComponentData = {},
	setShowModal = () => {},
	setInfoBanner = () => {},
	isFirst = false,
	margin = 0,
	isMobile = false,
}) {
	return (
		<div
			role="presentation"
			className={styles.container}
			style={{ margin }}
			onClick={() => {
				if (!isMobile) {
					return;
				}
				setShowModal(true);
			}}
		>
			<div className={styles.load_item}>
				<span className={styles.text}>
					{`${loadItem.containers_count} X ${
						['20', '40'].includes(loadItem.container_size)
							? `${loadItem.container_size}ft`
							: loadItem.container_size
					}, 
						${startCase(loadItem.container_type)}`}
				</span>

				{isAllowedToEdit && isFirst ? (
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
					{startCase(loadItem.commodity) || 'All Commodities'}
				</span>
			</div>
		</div>
	);
}

export default ContainerItem;
