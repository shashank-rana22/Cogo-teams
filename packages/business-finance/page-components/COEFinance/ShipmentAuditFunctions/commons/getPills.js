import { Placeholder, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

function GetPills({ loadingShipment = false, sourceText = '', tradeType = '' }) {
	console.log('hhhhhhhhh', tradeType);
	if (loadingShipment) {
		return <Placeholder height="20px" width="80px" />;
	}
	if (sourceText) {
		return <Pill color="blue">{sourceText}</Pill>;
	}
	if (tradeType) {
		return <Pill color="yellow">{startCase(tradeType)}</Pill>;
	}
	return <div>NO DATA FOUND</div>;
}

export default GetPills;
