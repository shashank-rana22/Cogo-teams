import useListInternalStakeholders from '../../../../hooks/useListInternalStakeholders';

import ServiceWiseStakeHolder from './ServiceWiseStakeHolder';

function POCDetails({ shipmentData }) {
	const { data:internalStakeHoldersList } = useListInternalStakeholders({ shipmentId: shipmentData?.id });

	const groupedInternalStakeHoldersList = internalStakeHoldersList?.reduce((acc, item) => {
		const { service_type, stakeholder_type } = item;
		if (stakeholder_type !== 'service_ops2') {
			let currentServiceType = service_type;
			if (currentServiceType === null) {
				currentServiceType = `${shipmentData?.shipment_type}_service`;
			}
			if (!acc[currentServiceType]) {
				acc[currentServiceType] = [];
			}
			acc[currentServiceType].push(item);
		}
		return acc;
	}, {});
	const serviceTabKeys = Object?.keys(groupedInternalStakeHoldersList || {});
	return (
		<div>
			{
                serviceTabKeys.map((singleServiceItem) => (
	<ServiceWiseStakeHolder
		data={groupedInternalStakeHoldersList?.[singleServiceItem]}
		key={singleServiceItem}
		serviceType={singleServiceItem}
	/>
                ))
            }
		</div>
	);
}
export default POCDetails;
