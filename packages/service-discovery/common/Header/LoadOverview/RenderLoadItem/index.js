import renderContainerDetails from './renderContainerDetails';
import renderPackageDetails from './renderPackageDetails';
import renderTruckDetails from './renderTruckDetails';

function RenderLoadItem({
	service = '',
	isAllowedToEdit = false,
	showSmall = false,
	setInfoBanner = () => {},
	setShowModal = () => {},
	loadItem = {},
	totalBanners = 0,
	showPopover = false,
	popoverComponentData = {},
	isFirst = false,
	margin = 0,
}) {
	const LOAD_MAPPING = {
		fcl_freight : renderContainerDetails,
		lcl_freight : renderPackageDetails,
		air_freight : renderPackageDetails,
		ltl_freight : renderTruckDetails,
		ftl_freight : renderTruckDetails,
	};

	const Component = LOAD_MAPPING[service || 'fcl_freight'] || renderTruckDetails;

	return (
		<Component
			service={service}
			isAllowedToEdit={isAllowedToEdit}
			showSmall={showSmall}
			setInfoBanner={setInfoBanner}
			loadItem={loadItem}
			totalBanners={totalBanners}
			showPopover={showPopover}
			popoverComponentData={popoverComponentData}
			isFirst={isFirst}
			margin={margin}
			setShowModal={setShowModal}
		/>
	);
}

export default RenderLoadItem;
