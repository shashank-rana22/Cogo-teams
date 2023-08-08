import { Tooltip, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getLoadArray from '../../../page-components/SearchResults/utils/getLoadArray';

import EditLoadModal from './EditLoadModal';
import RenderLoadItem from './RenderLoadItem';
import styles from './styles.module.css';

const ZERO_VALUE = 0;

function LoadOverview({
	data = {},
	service_key = 'search_type',
	loading = false,
	isAllowedToEdit = true,
	infoBanner = {},
	showSmall = false,
	setInfoBanner = () => {},
	isGuideViewed = false,
}) {
	const [showModal, setShowModal] = useState(false);

	const service = data[service_key];
	const { service_details, services } = data || {};

	const load = getLoadArray(service, service_details || services || []);
	const firstLoadObject = load.shift();

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
			<RenderLoadItem
				service={service}
				isAllowedToEdit={isAllowedToEdit}
				showSmall={showSmall}
				setInfoBanner={setInfoBanner}
				isFirst
				loadItem={firstLoadObject}
				totalBanners={totalBanners}
				showPopover={showPopover}
				popoverComponentData={popoverComponentData}
				setShowModal={setShowModal}
			/>

			{isEmpty(load) ? null : (
				<Tooltip
					maxWidth="max-content"
					placement="top"
					content={(
						<div className={styles.content}>
							{load.map((loadItem, index) => {
								const margin = !index ? ZERO_VALUE : '8px 0 0 0';

								return (
									<RenderLoadItem
										key={JSON.stringify(loadItem)}
										service={service}
										isAllowedToEdit={isAllowedToEdit}
										showSmall={showSmall}
										setInfoBanner={setInfoBanner}
										margin={margin}
										loadItem={loadItem}
										totalBanners={totalBanners}
										showPopover={showPopover}
										popoverComponentData={popoverComponentData}
										setShowModal={setShowModal}
									/>
								);
							})}
						</div>
					)}
				>
					<div className={styles.more_tag}>{`+${load.length} More`}</div>
				</Tooltip>
			)}

			{showModal ? (
				<EditLoadModal
					show={showModal}
					data={data}
					setShow={setShowModal}
				/>
			) : null}
		</div>
	);
}

export default LoadOverview;
