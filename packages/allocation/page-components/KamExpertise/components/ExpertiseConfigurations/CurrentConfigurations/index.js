import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations({ selectedVersion = '', setSelectedVersion }) {
	const router = useRouter();

	const { listKamExpertiseCurrentConfigs } = useGetKamExpertiseCurrentConfig();

	console.log('lis', listKamExpertiseCurrentConfigs);

	const VERSION_CARDS = listKamExpertiseCurrentConfigs?.list || [];

	return (
		<div>
			<Header
				selectedVersion={selectedVersion}
				setSelectedVersion={setSelectedVersion}

			/>

			{VERSION_CARDS.map((item) => (
				<ConfigurationCard
					{...item}

				/>
			))}

			<Button
				onClick={() => { router.push('/allocation/kam-expertise/configurations/viewall-configurations'); }}
				themeType="secondary"
			>
				View All Configurations
			</Button>
		</div>
	);
}

export default CurrentConfigurations;
