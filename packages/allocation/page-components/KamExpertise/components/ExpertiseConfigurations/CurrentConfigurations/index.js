import { Button } from '@cogoport/components';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations() {
	return (
		<div>
			<Header />

			<ConfigurationCard />

			<Button themeType="secondary" style={{ marginTop: '16px' }}>View All Configurations</Button>
		</div>
	);
}

export default CurrentConfigurations;
