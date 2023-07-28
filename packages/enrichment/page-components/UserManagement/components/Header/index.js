import { Button } from '@cogoport/components';
import { IcCCheckUserAttribute } from '@cogoport/icons-react';

import SearchInput from '../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const {
		debounceQuery,
		searchValue = '',
		setSearchValue = () => {},
		setActionModal = () => {},
		loading = false,
	} = props;

	return (
		<div className={styles.header}>

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
					themeType="secondary"
					style={{ marginLeft: '12px' }}
					disabled={loading}
					onClick={() => setActionModal(() => ({
						show      : true,
						type      : 'onboard',
						agentData : {},
					}))}
				>
					<IcCCheckUserAttribute width={16} height={16} style={{ marginRight: '4px' }} />
					<div>Onboard Agent</div>
				</Button>

			</div>

		</div>
	);
}

export default Header;
