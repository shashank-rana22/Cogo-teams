import { Button, Toggle } from '@cogoport/components';
import { IcMUsersManageAccounts } from '@cogoport/icons-react';

import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const {
		debounceQuery,
		searchValue = '',
		setSearchValue = () => {},
		setActionModal = () => {},
		loading = false,
		statusToggle = '',
		setStatusToggle = () => {},
	} = props;

	return (
		<div className={styles.header}>

			<div>
				<Toggle
					name="status"
					size="md"
					offLabel="Active"
					onLabel="Inactive"
					value={statusToggle}
					onChange={(e) => setStatusToggle(e?.target?.checked ? 'inactive' : 'active')}
					disabled={loading}
				/>

			</div>

			<div className={styles.right_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by name/email"
						setGlobalSearch={setSearchValue}
						debounceQuery={debounceQuery}
						value={searchValue}
					/>
				</div>

				<div className={styles.actions}>
					<Button
						size="md"
						type="button"
						themeType="primary"
						style={{ marginLeft: '12px' }}
						disabled={loading}
						onClick={() => setActionModal(() => ({
							show      : true,
							type      : 'onboard',
							agentData : {},
						}))}
					>
						<IcMUsersManageAccounts width={16} height={16} style={{ marginRight: '4px' }} />
						<div>Onboard Agent</div>
					</Button>

				</div>
			</div>

		</div>
	);
}

export default Header;
