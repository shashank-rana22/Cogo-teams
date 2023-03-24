import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LoadingState from '../LoadingState';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations({
	responseId,
	setResponseId,
	ConfigCardLoading,
	listKamExpertiseCurrentConfigs,
}) {
	const router = useRouter();

	const {
		list:data = [],
		audit_data = {},
	} = listKamExpertiseCurrentConfigs;

	const LIVE_VERSION = data.filter((item) => item.status_value === 'live')[0]?.version_number;

	const listLiveAndDraft = data.filter((item) => item.status_value === 'draft' || item.status_value === 'live');

	const VERSION_CARDS = listLiveAndDraft.reverse();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise/configurations/all-configurations');
	};

	return (
		(!ConfigCardLoading ? (
			<div>
				<Header
					audit_data={audit_data}
					data={data}
					LIVE_VERSION={LIVE_VERSION}
					responseId={responseId}
					setResponseId={setResponseId}
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
		) : <LoadingState />)
	);
}

export default CurrentConfigurations;
