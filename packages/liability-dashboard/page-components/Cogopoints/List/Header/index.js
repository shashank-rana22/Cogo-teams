import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import styles from './styles.module.css';

const DEFAULT_PAGE_NUMBER = 1;

const TITLE_MAPPING = {
	liability_point_value               : 'Earner',
	total_burnt_point_value             : 'Users',
	shipment_burnt_point_value          : 'Users',
	saas_subscription_burnt_point_value : 'Users',
	cogostore_burnt_point_value         : 'Users',

};

function Header({
	setSelectOrganization = () => {},
	selectOrganization = '',
	activeStatsCard = '',
	setPagination = () => {},
}) {
	return (
		<div className={styles.header_div}>
			<div className={styles.title}>
				Cogopoint
				<span>{TITLE_MAPPING[activeStatsCard]}</span>
			</div>
			<AsyncSelect
				name="id"
				asyncKey="organizations"
				valueKey="id"
				initialCall={false}
				onChange={(val) => {
					setSelectOrganization(val);
					setPagination(DEFAULT_PAGE_NUMBER);
				}}
				value={selectOrganization}
				placeholder="Select organization"
				size="md"
				isClearable
			/>
		</div>
	);
}

export default Header;
