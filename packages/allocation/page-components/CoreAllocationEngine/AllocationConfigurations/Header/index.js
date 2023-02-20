import { Legend, Button } from '@cogoport/components';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

const legendItems = [
	{
		label : 'Active',
		color : '#abcd62',
		key   : 'active',
	},
	{
		label : 'Publishable',
		color : '#f68b21',
		key   : 'publishable',
	},
	{
		label : 'Not Publishable',
		color : '#ee3425',
		key   : 'not_publishable',
	},
	{
		label : 'Draft',
		color : '#ac55ac',
		key   : 'draft',
	},
	{
		label : 'Checking',
		color : '#bdbdbd',
		key   : 'checking',
	},
];

function Header(props) {
	const {
		params,
		setParams,
		disabled,
		setShowCreateConfig,
	} = props;

	return (
		<div className={styles.header_container}>
			<Legend
				direction="horizontal"
				size="md"
				items={legendItems}
			/>

			<div className={styles.right_container}>
				<ConfigFilters params={params} setParams={setParams} disabled={disabled} />

				<Button
					size="md"
					themeType="primary"
					onClick={() => setShowCreateConfig(true)}
					disabled={disabled}
				>
					Create
				</Button>
			</div>
		</div>
	);
}

export default Header;
