import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import ConfigurationCard from './ConfigurationCard';
import Header from './Header';

const VERSION_CARDS = [
	{
		version       : 4,
		last_edit_by  : 'CogoParth',
		last_modified : new Date(),
		status        : 'draft',
	},
	{
		version       : 3,
		last_edit_by  : 'CogoParth',
		last_modified : new Date(),
		status        : 'live',
	},
];

function CurrentConfigurations({ handleClick = () => {} }) {
	const router = useRouter();
	return (
		<div>
			<Header />

			{VERSION_CARDS.map((item) => (
				<ConfigurationCard
					{...item}
					handleClick={handleClick}
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
