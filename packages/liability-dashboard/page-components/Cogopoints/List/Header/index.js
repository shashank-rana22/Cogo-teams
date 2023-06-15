import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';

import styles from './styles.module.css';

const DEFAULT_PAGE_NUMBER = 1;

function Header({
	setSelectOrganization = () => {},
	selectOrganization = '',
	activeStatsCard = '',
	setPagination = () => {},
}) {
	return (
		<div className={styles.header_div}>
			{activeStatsCard === 'liability_point_value' ? (
				<div className={styles.title}>Cogopoint Earners</div>
			) : (
				<div className={styles.title}>Cogopoint Users</div>
			)}
			<AsyncSelect
				name="id"
				asyncKey="organizations"
				valueKey="id"
				initialCall={false}
				onChange={(val) => { setSelectOrganization(val); setPagination(DEFAULT_PAGE_NUMBER); }}
				value={selectOrganization}
				placeholder="Select organization"
				size="md"
				isClearable
			/>
		</div>
	);
}

export default Header;
