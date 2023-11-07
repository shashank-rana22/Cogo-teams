import { Placeholder, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getLoadArray from '../../../../page-components/SearchResults/utils/getLoadArray';

import EditLoad from './EditLoad';
import LoadItem from './LoadItem';
import styles from './styles.module.css';

const SERVICE = 'ftl_freight';

function Load({
	data = {},
	loading = false,
	isAllowedToEdit = true,
	infoBanner = {},
	setInfoBanner = () => {},
	setRouterLoading = () => {},
	isGuideViewed = false,
	touch_points = {},
	createLoading = false,
	createSearch = () => {},
	isMobile = false,
}) {
	const [showModal, setShowModal] = useState(false);

	if (isEmpty(data)) {
		return null;
	}

	const { service_details, services } = data || {};

	const load = getLoadArray(SERVICE, service_details || services || []);

	const [firstLoadObject, ...remainingLoadObjects] = load;

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	const showPopover = current === 'edit_button' && !isGuideViewed;

	const popoverComponentData = buttonProps.edit_button || {};

	if (loading) {
		return (
			<div className={styles.container}>
				<Placeholder height="25px" width="100px" margin="0px 16px 0px 0px" />
				<Placeholder height="25px" width="100px" margin="0px 36px 0px 0px" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<LoadItem
				isAllowedToEdit={isAllowedToEdit}
				setInfoBanner={setInfoBanner}
				loadItem={firstLoadObject}
				totalBanners={totalBanners}
				showPopover={showPopover}
				popoverComponentData={popoverComponentData}
				setShowModal={setShowModal}
				isMobile={isMobile}
			/>

			{!isEmpty(remainingLoadObjects) ? (
				<Tooltip
					maxWidth="max-content"
					placement="top"
					content={(
						<div className={styles.content}>
							{(remainingLoadObjects || []).map((loadItem, index) => {
								const margin = !index ? index : '8px 0 0 0';

								return (
									<LoadItem
										key={loadItem.id}
										isAllowedToEdit={false}
										setInfoBanner={setInfoBanner}
										margin={margin}
										loadItem={loadItem}
										totalBanners={totalBanners}
										showPopover={showPopover}
										popoverComponentData={popoverComponentData}
										setShowModal={setShowModal}
										popoverContent
										isMobile={isMobile}
									/>
								);
							})}
						</div>
					)}
				>
					<div className={styles.more_tag}>{`+${remainingLoadObjects.length} More`}</div>
				</Tooltip>
			) : null}

			{showModal ? (
				<EditLoad
					show={showModal}
					data={data}
					setShow={setShowModal}
					setRouterLoading={setRouterLoading}
					touch_points={touch_points}
					createLoading={createLoading}
					createSearch={createSearch}
					isMobile={isMobile}
				/>
			) : null}
		</div>
	);
}

export default Load;
