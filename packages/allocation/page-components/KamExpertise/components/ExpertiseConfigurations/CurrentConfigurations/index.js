import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations({ selectedVersion = '', setSelectedVersion }) {
	const router = useRouter();

	const { listKamExpertiseCurrentConfigs } = useGetKamExpertiseCurrentConfig();

	const data = listKamExpertiseCurrentConfigs?.list || [];

	const VERSION_CARDS = data.filter((item) => item.status_value === 'draft' || item.status_value === 'live');

	const audit_data = listKamExpertiseCurrentConfigs?.audit_data || {};

	const version_details = listKamExpertiseCurrentConfigs?.version_list_details || {};

	return (
		<div>
			<Header
				selectedVersion={selectedVersion}
				setSelectedVersion={setSelectedVersion}
				audit_data={audit_data}
				version_details={version_details}

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
