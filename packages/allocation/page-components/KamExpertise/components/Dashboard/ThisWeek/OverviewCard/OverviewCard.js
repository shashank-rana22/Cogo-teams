import { IcAHelpingHand011, IcMAgentManagement } from '@cogoport/icons-react';
import React from 'react';

function OverviewCard() {
	const overview_data = [
		{
			title     : 'Customer Expertise',
			avg_score : 2300,
			points_in : 'Re-activation',
			icon      : <IcMAgentManagement height={20} width={20} />,
		},
		{
			title     : 'Trade Expertise',
			avg_score : 2300,
			points_in : 'Re-activation',
			icon      : <IcAHelpingHand011 height={24} width={24} />,
		},
		{
			title     : 'Commodity Expertise',
			avg_score : 2300,
			points_in : 'Re-activation',
			icon      : <IcMAgentManagement height={20} width={20} />,
		},
		{
			title     : 'Misc  Expertise',
			avg_score : 2300,
			points_in : 'Re-activation',
			icon      : <IcAHelpingHand011 height={24} width={24} />,
		},
	];

	return (
		<div>OverviewCard</div>
	);
}

export default OverviewCard;
