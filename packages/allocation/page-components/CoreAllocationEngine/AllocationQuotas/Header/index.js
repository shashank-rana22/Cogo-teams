import { Button, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header(props) {
	const {
		loading,
		setParams,
		toggleRoleType,
		onClickCreateQuota,
	} = props;

	console.log('toggleValue', toggleRoleType);

	// Todo search filter should expand on clicking

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

			<div>
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
