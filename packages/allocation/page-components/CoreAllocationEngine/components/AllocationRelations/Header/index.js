import { Button, Toggle } from '@cogoport/components';

import SearchInput from '../../../../../common/SearchInput';

import ConfigFilters from './ConfigFilters';
import styles from './styles.module.css';

function Header({
	setShowCreateRelationModal = () => {},
	setParams = () => {},
	params,
	disabled,
	setActiveTab = () => {},
	searchValue,
	setSearchValue = () => {},
	debounceQuery,
}) {
	const onChangeToggle = (event) => {
		setParams((previousParams) => ({
			...previousParams,
			page    : 1,
			filters : {
				...((previousParams || {}).filters || {}),
				status: event?.target?.checked ? 'pending' : 'active',
			},
		}));
		setActiveTab(() => {
			if (event?.target?.checked) {
				return 'pending';
			}

			return 'active';
		});
	};

	return (
		<div className={styles.header_container}>
			<div className={styles.toggle_container}>
				<Toggle
					name="relation_status"
					size="md"
					offLabel="Active"
					onLabel="Pending"
					onChange={(event) => onChangeToggle(event)}
					disabled={disabled}
				/>

			</div>

			<div className={styles.button_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder="Search by Company Name/User/Stakeholder"
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
					style={{ marginLeft: '8px' }}
					onClick={() => setShowCreateRelationModal(true)}
					disabled={disabled}
				>
					Create
				</Button>
			</div>

		</div>

	);
}

export default Header;
