import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LoadingState from '../LoadingState';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations(props) {
	const {
		configCardLoading,
		listKamExpertiseCurrentConfigs,
		refetch,
		expertiseRefetch,
		cardRefetch,
	} = props;

	const router = useRouter();

	const {
		list:data = [],
		audit_data = {}, //! data not comming api key changed
	} = listKamExpertiseCurrentConfigs;

	const LIVE_VERSION = data.filter((item) => item.status === 'live')[0]?.version_number;

	const listLiveAndDraft = data.filter((item) => ['draft', 'live'].includes(item.status));

	const VERSION_CARDS = listLiveAndDraft.reverse();

	const onClickViewAllConfig = () => {
		router.push('/allocation/kam-expertise/configurations/all-configurations');
	};

	if (configCardLoading) {
		return <LoadingState />;
	}

	return (
		<div>
			<Header
				audit_data={audit_data}
				data={data}
				LIVE_VERSION={LIVE_VERSION}
				refetch={refetch}
				expertiseRefetch={expertiseRefetch}
				cardRefetch={cardRefetch}
			/>

			{VERSION_CARDS.map((item) => (
				<ConfigurationCard
					{...item}
				/>
			))}

			<Button
				onClick={onClickViewAllConfig}
				themeType="secondary"
			>
				View All Configurations
			</Button>
		</div>
	);
}

export default CurrentConfigurations;
