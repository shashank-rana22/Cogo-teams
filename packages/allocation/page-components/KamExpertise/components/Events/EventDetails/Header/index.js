import { Button, Select } from '@cogoport/components';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

const OPTIONS = [
	{
		label : 'Customer Expertise',
		value : 'customer_expertise',
	},
	{
		label : 'Trade Expertise',
		value : 'trade_expertise',
	},
	{
		label : 'Commodity Expertise',
		value : 'commodity_expertise',
	},
	{
		label : 'Misc Expertise',
		value : 'miscellaneous',
	},
];

function Header(props) {
	const {
		setEventListData = () => {},
		loading = false,
		debounceQuery,
		setSearchValue = () => {},
		searchValue = '',
		expertise = '',
		setExpertise = () => {},
	} = props;

	const onAdd = () => {
		setEventListData({
			data        : {},
			toggleEvent : 'updateEvent',
		});
	};

	return (
		<div>
			<div className={styles.all_events}>All Events</div>

			<div className={styles.header_container}>
				<div className={styles.filter_container}>
					<Select
						size="sm"
						isClearable
						placeholder="Expertise Type"
						value={expertise}
						options={OPTIONS}
						onChange={(value) => (
							setExpertise(value)
						)}
						className={styles.dropdown}
						disabled={loading}
					/>

					<SearchInput
						size="sm"
						placeholder="Search"
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
					Add New Event
				</Button>
			</div>
		</div>
	);
}

export default Header;
