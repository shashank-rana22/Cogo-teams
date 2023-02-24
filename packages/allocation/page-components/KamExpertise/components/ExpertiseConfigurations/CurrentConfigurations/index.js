import { Button } from '@cogoport/components';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

const VERSION_CARDS = [
	{
		version       : 4,
		last_edit_by  : 'CogoParth',
		last_modified : new Date(),
		status        : 'draft',
	},
	{
		version       : 3,
		last_edit_by  : 'CogoParth',
		last_modified : new Date(),
		status        : 'live',
	},
];

function CurrentConfigurations() {
	return (
		<div>
			<Header />

			{VERSION_CARDS.map((item) => (
				<ConfigurationCard {...item} />
			))}

			<Button themeType="secondary">View All Configurations</Button>
		</div>
	);
}

export default CurrentConfigurations;
