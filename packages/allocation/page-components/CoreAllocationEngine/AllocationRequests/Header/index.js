import { Button, Toggle } from '@cogoport/components';

import SearchInput from '../../../../common/SearchInput';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header(props) {
	const {
		onClickCreateReqBtn,
		loading,
		params,
		setParams,
		onChangeParams,
		toggleValue,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	// Todo search filter should expand on clicking

	return (
		<div className={styles.container}>
			<Toggle
				name="allocation_type"
				size="md"
				offLabel="Organization"
				onLabel="Partner"
				disabled={loading}
				value={toggleValue}
				onChange={(e) => onChangeParams({
					filters:
					{ service_type: e?.target?.checked ? 'partner' : 'organization' },
				})}
			/>

			<div className={styles.filter_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by Organization name / User name"
						setGlobalSearch={setSearchValue}
						debounceQuery={debounceQuery}
						value={searchValue}

					/>
				</div>

				<ConfigFilters
					params={params}
					setParams={setParams}
					disabled={loading}
				/>

				<Button
					size="md"
					themeType="accent"
					disabled={loading}
					onClick={onClickCreateReqBtn}
				>
					CREATE REQUEST
				</Button>
			</div>
		</div>
	);
}

export default Header;
