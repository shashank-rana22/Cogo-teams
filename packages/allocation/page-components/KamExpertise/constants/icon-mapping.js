import { IcMBreakBulkCargoType, IcMMiscellaneous, IcMTradeparties, IcMAgentManagement } from '@cogoport/icons-react';

const ICON_MAPPING = {
	customer_expertise      : <IcMAgentManagement />,
	trade_expertise         : <IcMTradeparties />,
	commodity_expertise     : <IcMBreakBulkCargoType />,
	miscellaneous           : <IcMMiscellaneous />,
	miscellaneous_expertise : <IcMMiscellaneous />,
};

export default ICON_MAPPING;
