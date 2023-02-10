import { Button, Toggle } from '@cogoport/components';

import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const {
		loading,
		setParams,
		toggleRoleType,
		onClickCreateQuota,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	return (
		<div className={styles.container}>
			<Toggle
				name="role_type"
				size="md"
				offLabel="Role"
				onLabel="User"
				disabled={loading}
				value={toggleRoleType}
				onChange={(e) => setParams((pv) => ({
					...pv,
					filters:
						{
							...pv.filters,
							quota_type: e?.target?.checked ? 'user' : 'role',
						},
				}))}
			/>

			<div className={styles.filters_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by Role name / User name"
						setGlobalSearch={setSearchValue}
						debounceQuery={debounceQuery}
						value={searchValue}
					/>
				</div>

				<Button
					size="md"
					themeType="accent"
					disabled={loading}
					onClick={onClickCreateQuota}
				>
					CREATE QUOTA
				</Button>
			</div>
		</div>
	);
}

export default Header;
