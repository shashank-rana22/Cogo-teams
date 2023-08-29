import { useRouter } from '@cogoport/next';

import ConfigurationCard from '../ConfigurationCard';
import LoadingState from '../LoadingState';

import Header from './Header';

function CurrentConfigurations(props) {
	const router = useRouter();

	const {
		configCardLoading,
		list,
		refetch,
		expertiseRefetch,
		cardRefetch,
		scrollDraftRef,
	} = props;

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
					key={item?.version_number}
					{...item}
				/>
			))}

		</div>
	);
}

export default CurrentConfigurations;
