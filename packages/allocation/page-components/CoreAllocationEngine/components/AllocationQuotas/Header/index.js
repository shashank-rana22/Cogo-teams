import { Button, Toggle } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['allocation']);

	return (
		<div className={styles.container}>
			<Toggle
				name="role_type"
				size="md"
				offLabel={t('allocation:role_label')}
				onLabel={t('allocation:user_label')}
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
						placeholder={t('allocation:search_by_role_name_placeholder')}
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
					{t('allocation:create_button')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
