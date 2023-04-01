import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import LoadingState from '../LoadingState';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

function CurrentConfigurations(props) {
	const {
		configCardLoading,
		data,
		refetch,
		expertiseRefetch,
		cardRefetch,
		LIVE_VERSION_DATA = {},
		DRAFTS = [],
	} = props;

	const router = useRouter();

	const { list = [] } = data;

	const { version_number = '', audit_data = {} } = LIVE_VERSION_DATA;

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
				data={list} //! ToDo : Try to remove its use
				version_number={version_number}
				refetch={refetch}
				expertiseRefetch={expertiseRefetch}
				cardRefetch={cardRefetch}
			/>

			{DRAFTS.map((item) => (
				<ConfigurationCard
					{...item}
				/>
			))}

			<ConfigurationCard
				{...LIVE_VERSION_DATA}
			/>

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
