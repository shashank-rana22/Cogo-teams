import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LoadingState from '../LoadingState';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations({
	responseId,
	setResponseId,
	configCardLoading,
	listKamExpertiseCurrentConfigs,
	refetch,
	expertiseRefetch,
	cardRefetch,
	onPublish,
	setOnPublish,
}) {
	const router = useRouter();

	const {
		list:data = [],
		audit_data = {},
	} = listKamExpertiseCurrentConfigs;

	const LIVE_VERSION = data.filter((item) => item.status_value === 'live')[0]?.version_number;

	const listLiveAndDraft = data.filter((item) => ['draft', 'live'].includes(item.status_value));

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
				responseId={responseId}
				setResponseId={setResponseId}
				refetch={refetch}
				expertiseRefetch={expertiseRefetch}
				cardRefetch={cardRefetch}
				setOnPublish={setOnPublish}
				onPublish={onPublish}
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
