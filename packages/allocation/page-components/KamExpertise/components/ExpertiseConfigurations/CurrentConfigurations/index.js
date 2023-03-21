import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';
import LoadingState from '../LoadingState';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations({ selectedVersion = '', setSelectedVersion }) {
	const router = useRouter();

	const { listKamExpertiseCurrentConfigs, ConfigCardLoading } = useGetKamExpertiseCurrentConfig();

	const {
		list:data = [],
		audit_data = {},
		version_list_details:version_details = {},
	} = listKamExpertiseCurrentConfigs;

	const listArray = data.filter((item) => item.status_value === 'draft' || item.status_value === 'active');

	const VERSION_CARDS = listArray.reverse();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise/configurations/all-configurations');
	};

	return (
		(!ConfigCardLoading ? (
			<div>
				<Header
					selectedVersion={selectedVersion}
					setSelectedVersion={setSelectedVersion}
					audit_data={audit_data}
					version_details={version_details}
					data={data}
				/>

				{VERSION_CARDS.map((item) => (
					<ConfigurationCard
						{...item}
					/>
				))}

				<Button
					onClick={onClickBack}
					themeType="secondary"
				>
					View All Configurations
				</Button>
			</div>
		) : (<LoadingState />))

	);
}

export default CurrentConfigurations;
