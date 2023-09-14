import { Button } from '@cogoport/components';
import { IcMSettings } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const { setToggleComponent = () => {}, setSearchValue, debounceQuery, searchValue } = props;

	return (
		<div className={styles.header_container}>
			<div className={styles.heading}>{t('allocation:warmth_score_configuration')}</div>

			<div className={styles.sub_container}>

				<SearchInput
					placeholder={t('allocation:search_engagement_type')}
					size="sm"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
				/>

				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setToggleComponent('settings')}
						style={{ marginRight: '16px' }}
					>
						<IcMSettings style={{ marginRight: '4px' }} />
						{t('allocation:settings')}
					</Button>

				</div>

			</div>

		</div>

	);
}

export default Header;
