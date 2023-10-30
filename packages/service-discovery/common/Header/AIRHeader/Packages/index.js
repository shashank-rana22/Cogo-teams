import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import getLoadArray from '../../../../page-components/SearchResults/utils/getLoadArray';

import EditPackages from './EditPackages';
import PackageItem from './PackageItem';
import styles from './styles.module.css';

const SERVICE = 'air_freight';

function Packages({
	data = {},
	loading = false,
	isAllowedToEdit = true,
	infoBanner = {},
	setInfoBanner = () => {},
	setRouterLoading = () => {},
	isGuideViewed = false,
	createLoading = false,
	createSearch = () => {},
	isMobile = false,
}) {
	const [showModal, setShowModal] = useState(false);

	const { service_details, services, chargeable_weight = 0 } = data || {};

	const load = getLoadArray(SERVICE, service_details || services || []);

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
			<PackageItem
				isAllowedToEdit={isAllowedToEdit}
				setInfoBanner={setInfoBanner}
				loadItem={load[GLOBAL_CONSTANTS.zeroth_index]}
				totalBanners={totalBanners}
				showPopover={showPopover}
				popoverComponentData={popoverComponentData}
				setShowModal={setShowModal}
				chargeable_weight={chargeable_weight}
			/>

			{showModal ? (
				<EditPackages
					show={showModal}
					data={data}
					setShow={setShowModal}
					setRouterLoading={setRouterLoading}
					createLoading={createLoading}
					createSearch={createSearch}
					isMobile={isMobile}
				/>
			) : null}
		</div>
	);
}

export default Packages;
