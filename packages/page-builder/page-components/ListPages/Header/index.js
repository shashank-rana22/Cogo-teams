import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import SearchInput from '../../../commons/SearchInput';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
	const {
		params,
		setParams,
		disabled,
		setSearchValue,
		debounceQuery,
		searchValue,
		setShowCreatePage,
	} = props;

	return (
		<div className={styles.header_container}>

			<div className={styles.search_container}>
				<SearchInput
					size="sm"
					placeholder="Search by Page Name"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
					disabled={disabled}
				/>
			</div>

			<ConfigFilters
				params={params}
				setParams={setParams}
				disabled={disabled}
			/>

			<Button
				size="md"
				themeType="primary"
				style={{ marginLeft: '12px' }}
				onClick={() => setShowCreatePage(true)}
				disabled={disabled}
			>
				<IcMPlus style={{ marginRight: '4px' }} width={18} height={18} />
				<div>New</div>
			</Button>
		</div>

	);
}

export default Header;
