import { Button } from '@cogoport/components';
import { IcMSettings } from '@cogoport/icons-react';

import SearchInput from '../../../../../../common/SearchInput';

import styles from './styles.module.css';

function Header(props) {
	const { setToggleComponent = () => {}, setSearchValue, debounceQuery, searchValue } = props;
	return (
		<div className={styles.header_container}>
			<div className={styles.heading}>Warmth Score Configuration</div>
			<div className={styles.sub_container}>

				<SearchInput
					placeholder="Search Engagement Type"
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
						<IcMSettings margin="0px 8px 0px 0px" />
						Settings

					</Button>

					<Button className={styles.engagement_button} size="md">+ Engagement Type</Button>
				</div>

			</div>

		</div>

	);
}

export default Header;
