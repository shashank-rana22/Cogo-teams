import { Button, Toggle } from '@cogoport/components';

import SearchInput from '../../../../../common/SearchInput';

import styles from './styles.module.css';

function Header({
	disabled,
	setParams = () => {},
	toggleRoleType,
	onClickCreateQuota,
	debounceQuery,
	searchValue,
	setSearchValue = () => {},
}) {
	return (
		<div className={styles.container}>
			<Toggle
				name="role_type"
				size="md"
				offLabel="Role"
				onLabel="User"
				value={toggleRoleType}
				onChange={(e) => setParams((pv) => ({
					...pv,
					filters:
						{
							...pv.filters,
							quota_type: e?.target?.checked ? 'user' : 'role',
						},
				}))}
				disabled={disabled}
			/>

			<div className={styles.filters_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by Role name / User name"
						setGlobalSearch={setSearchValue}
						debounceQuery={debounceQuery}
						value={searchValue}
						disabled={disabled}
					/>
				</div>

				<Button
					size="md"
					themeType="primary"
					onClick={onClickCreateQuota}
					disabled={disabled}
				>
					Create
				</Button>
			</div>
		</div>
	);
}

export default Header;
