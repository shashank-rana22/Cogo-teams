import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LoadingState from '../LoadingState';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations(props) {
	const {
		configCardLoading,
		list,
		refetch,
		expertiseRefetch,
		cardRefetch,
	} = props;

	const router = useRouter();

	const liveAndDraftVersions = list.filter((item) => ['draft', 'live'].includes(item?.status));

	const onClickViewAllConfig = () => {
		router.push('/allocation/kam-expertise/configurations/all-configurations');
	};

	if (configCardLoading) {
		return <LoadingState />;
	}

	return (
		<div>
			<Header
				list={list}
				refetch={refetch}
				expertiseRefetch={expertiseRefetch}
				cardRefetch={cardRefetch}
			/>

			{liveAndDraftVersions?.map((item) => (
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
