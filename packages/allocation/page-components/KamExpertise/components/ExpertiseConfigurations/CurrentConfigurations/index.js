import { useRouter } from '@cogoport/next';

import ConfigurationCard from '../ConfigurationCard';
import LoadingState from '../LoadingState';

import Header from './Header';

function CurrentConfigurations(props) {
	const {
		configCardLoading,
		list,
		refetch,
		expertiseRefetch,
		cardRefetch,
		scrollDraftRef,
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
				onClickViewAllConfig={onClickViewAllConfig}
				scrollDraftRef={scrollDraftRef}
			/>

			{liveAndDraftVersions?.map((item) => (
				<ConfigurationCard
					{...item}
				/>
			))}

		</div>
	);
}

export default CurrentConfigurations;
