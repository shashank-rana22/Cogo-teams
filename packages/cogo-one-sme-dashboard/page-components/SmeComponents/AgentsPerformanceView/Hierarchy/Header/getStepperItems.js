import { IcMHome } from '@cogoport/icons-react';

function getStepperItems({ hierarchyData = [] }) {
	const nextData = hierarchyData?.map(
		(itm) => ({
			label : itm?.name,
			key   : itm?.id,
		}),
	) || [];

	return [
		{ label: <IcMHome />, key: 'home' },
		...nextData,
	];
}

export default getStepperItems;
