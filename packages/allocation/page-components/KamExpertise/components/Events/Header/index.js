import { Button, Select } from '@cogoport/components';

import SearchInput from '../../../../../common/SearchInput';

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
		value : 'misc_expertise',
	},
];

function Header(props) {
	// Todo take it from params like in case of search
	const {
		setToggleEvent = () => {},
		loading,
		debounceQuery, setSearchValue = () => {}, searchValue, expertise, setExpertise = () => {},
	} = props;

	const onClose = () => {
		setToggleEvent('createNew');
	};

	return (
		<div>
			<div className={styles.all_events}>All Events</div>

			<div className={styles.header_container}>
				<div className={styles.filter_container}>
					<Select
						size="md"
						isClearable
						placeholder="Expertise Type"
						value={expertise}
						options={OPTIONS}
						onChange={(value) => (
							setExpertise(value)
						)}
						style={{ marginRight: 16, width: '440px' }}
						disabled={loading}
					/>

					<SearchInput
						size="md"
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
					onClick={onClose}
					disabled={loading}
				>
					Add New Event
				</Button>
			</div>
		</div>
	);
}

export default Header;
