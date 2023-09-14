import { Button } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useTranslation } from 'next-i18next';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const { t } = useTranslation(['allocation']);
	const {
		setToggleScreen = () => {},
		searchValue,
		setSearchValue = () => {},
		expertise,
		setExpertise = () => {},
		debounceQuery,
		setMasteryItemData = () => {},
		setBadgeItemData,
		loading,
	} = props;

	return (
		<div className={styles.header_container}>
			<div className={styles.filter_container}>
				<AsyncSelect
					placeholder={t('allocation:event_label')}
					size="sm"
					value={expertise}
					onChange={(value) => setExpertise(value)}
					asyncKey="expertise_configuration"
					multiple
					isClearable
					disabled={loading}
					className={styles.dropdown}
				/>

				<SearchInput
					size="sm"
					placeholder={t('allocation:search_label')}
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
					className={styles.search_bar}
					disabled={loading}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					size="md"
					className={styles.button_mastery}
					disabled={loading}
					onClick={() => {
						setMasteryItemData({});
						setToggleScreen('create_mastery');
					}}
				>
					{t('allocation:add_mastery_label')}
				</Button>

				<Button
					themeType="primary"
					size="md"
					className={styles.button_badge}
					disabled={loading}
					onClick={() => {
						setBadgeItemData({});
						setToggleScreen('create_badge');
					}}
				>
					{t('allocation:add_new_badge_label')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
