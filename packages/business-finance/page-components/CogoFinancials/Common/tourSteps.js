/* eslint-disable max-len */
import { Button } from '@cogoport/components';

export const HOME_TOUR_STEPS = [
	{
		selector : '[data-tour="main-heading"]',
		content  : 'Welcome to Cogo Financials! Click here to directly return to homepage from any other page',
	},
	{
		selector : '[data-tour="ongoing-shipments-heading"]',
		content  : 'Get details of ongoing shipments here.',
	},
	{
		selector : '[data-tour="operationally-closed-heading"]',
		content  : 'Get details of operationally closed shipments here.',
	},
	{
		selector : '[data-tour="financially-closed-heading"]',
		content  : 'Get details of financially closed shipments here.',
	},
	{
		selector                 : '[data-tour="ongoing-card"]',
		content                  : 'Click on highlighted area to get more details.',
		shouldDisableInteraction : true,
	},
];

export const ONGOING_PARENT_SERVICES_STEPS = [
	{
		selector : '[data-tour="parent-service-main"]',
		content  : 'Here is the overall summary of ongoing shipments',
	},
	{
		selector : '[data-tour="parent-service-group"]',
		content  : 'You can check the details of all parent services of ongoing shipments. Click on any service to get more data.',
	},
	{
		selector : '[data-tour="single-parent-service"]',
		content  : 'Click on highlighted area to see service wise data',
	},
];

export const getSingleServiceSteps = ({ setActiveShipmentCard = () => {}, setIsTourInitial = () => {} }) => [
	{
		selector : '[data-tour="single-service"]',
		content  : () => (
			<div>
				<div>You can see data of single service here.</div>
				<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
					<Button
						onClick={() => {
							setActiveShipmentCard('');
							setIsTourInitial(false);
						}}
					>
						Let&apos;s go back to homepage !

					</Button>
				</div>
			</div>
		),
	},
];

export const FINANCIAL_HOME_STEP = [
	{
		selector : '[data-tour="financial-closed-card-clickable"]',
		content  : "Now let's explore data of closed shipments by clicking on it",
	},
];

export const CLOSED_PARENT_SERVICES_STEPS = [
	{
		selector : '[data-tour="closed-single-parent-bar"]',
		content  : 'Here are the details according to services. Please click on any bar to view specific data.',
	},
];

export const BAR_GROUP_CHILDREN = [
	{
		selector : '[data-tour="children-bar-group"]',
		content  : 'Here is the detailed graph of service wise data. You can click on "View Details" button(on top) to see list below the graph. The tutorial ends here... Please click on "Cogo Financials" to return to homepage. ',
	},
];
