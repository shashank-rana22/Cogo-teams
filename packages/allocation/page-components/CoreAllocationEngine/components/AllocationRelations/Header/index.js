import { Button, Toggle } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

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
					offLabel={t('allocation:active_off_label')}
					onLabel={t('allocation:pending_on_label')}
					onChange={(event) => onChangeToggle(event)}
					disabled={disabled}
				/>

			</div>

			<div className={styles.button_container}>
				<div className={styles.search_container}>
					<SearchInput
						size="sm"
						placeholder={t('allocation:search_business_name_placeholder')}
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
					{t('allocation:create_button')}
				</Button>
			</div>

		</div>

	);
}

export default Header;
