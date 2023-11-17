import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import StyledTabs from '../../common/StyledTabs';
import StyledTabPanel from '../../common/StyledTabs/StyledTabPanel';
import { salesDashboard as configurations } from '../../configurations/sales-dashboard';

import List from './List';

function SalesDashboard({
	importer_exporter_id = '',
	service_type = '',
	destination_location_id = '',
	origin_location_id = '',
	setLocation = () => {},
	organization = {},
	createSearch = () => {},
	createSearchLoading = false,
}) {
	const router = useRouter();

	const { query = {} } = router;

	const { activeTab: selectedActiveTab = '' } = query;

	const [activeTab, setActiveTab] = useState(selectedActiveTab || configurations[GLOBAL_CONSTANTS.zeroth_index].type);

	const PROPS_MAPPING_WITH_FUNCTION_NAME = {
		renderPortPair: {
			setLocation,
			service_type,
		},
		renderButton: {
			router,
			organization,
			createSearch,
			createSearchLoading,
		},
	};

	return (
		<StyledTabs
			fullWidth
			themeType="secondary"
			activeTab={activeTab}
			onChange={setActiveTab}
		>
			{configurations.map((listItem) => {
				const newListItem = { ...listItem };

				const { type = '', heading = '', fields = [] } = newListItem;

				let finalFields = [...fields];

				if (['most_searched', 'most_booked', 'spot_searches'].includes(type)) {
					let btnObj = fields.filter((fieldItem) => fieldItem.func === 'renderButton');
					const remainingBtnFields = fields.filter((fieldItem) => fieldItem.func !== 'renderButton');

					if (!importer_exporter_id) {
						btnObj = [{
							...btnObj?.[GLOBAL_CONSTANTS.zeroth_index],
							disabled : true,
							btnLabel : 'Select an Org',
						}];
					}

					finalFields = [...remainingBtnFields, ...btnObj];
				}

				const updatedFields = finalFields.map((fieldItem) => ({
					...fieldItem,
					props: PROPS_MAPPING_WITH_FUNCTION_NAME[fieldItem.func],
				}));

				return (
					<StyledTabPanel
						key={type}
						name={type}
						title={heading}
					>
						<List
							key={`${type}_${heading}`}
							{...newListItem}
							fields={updatedFields}
							importer_exporter_id={importer_exporter_id || undefined}
							service_type={service_type || undefined}
							origin_location_id={origin_location_id || undefined}
							destination_location_id={destination_location_id || undefined}
							dashboard="sales"
						/>
					</StyledTabPanel>
				);
			})}
		</StyledTabs>
	);
}

export default SalesDashboard;
