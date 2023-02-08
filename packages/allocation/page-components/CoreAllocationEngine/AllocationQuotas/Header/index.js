import { Button, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header(props) {
	const {
		loading,
		params,
		setParams,
		toggleValue,
		onClickCreateQuota,
	} = props;

	// Todo search filter should expand on clicking

	return (
		<div className={styles.container}>
			<Toggle
				name="role_type"
				size="md"
				offLabel="Role"
				onLabel="User"
				disabled={loading}
				value={toggleValue}
				onChange={(e) => setParams((pv) => ({
					...pv,
					filters:
					{
						...pv.filters,
						service_type: e?.target?.checked ? 'role' : 'user',
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
