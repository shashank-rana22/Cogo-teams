import { Button, Select } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

const getOptions = ({ t = () => {} }) => [
	{
		label : t('allocation:expertise_type_options_customer_expertise'),
		value : 'customer_expertise',
	},
	{
		label : t('allocation:expertise_type_options_trade_expertise'),
		value : 'trade_expertise',
	},
	{
		label : t('allocation:expertise_type_options_commodity_expertise'),
		value : 'commodity_expertise',
	},
	{
		label : t('allocation:misc_expertise_label'),
		value : 'miscellaneous',
	},
];

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const {
		setEventListData = () => {},
		loading = false,
		debounceQuery,
		setSearchValue = () => {},
		searchValue = '',
		expertise = '',
		setExpertise = () => {},
	} = props;

	const options = getOptions({ t });

	const onAdd = () => {
		setEventListData({
			data        : {},
			toggleEvent : 'updateEvent',
		});
	};

	return (
		<div>
			<div className={styles.all_events}>
				{t('allocation:all_events_label')}
			</div>

			<div className={styles.header_container}>
				<div className={styles.filter_container}>
					<Select
						size="sm"
						isClearable
						placeholder={t('allocation:expertise_label')}
						value={expertise}
						options={options}
						onChange={(value) => (
							setExpertise(value)
						)}
						className={styles.dropdown}
						disabled={loading}
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

				<Button
					themeType="primary"
					size="md"
					onClick={onAdd}
					disabled={loading}
					className={styles.add_button}
				>
					{t('allocation:add_new_event_label')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
