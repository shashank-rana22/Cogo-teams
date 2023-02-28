import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import Filters from '../Filters';

import styles from './styles.module.css';

// eslint-disable-next-line max-len
const URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/842e7874b58a6b38fa1de94c77c753d1/feedback_response.csv';

function Header(props) {
	const {
		filters,
		onChangeFilters,
		secondaryTab,
		activeTab,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = props;

	return (
		<div className={styles.header}>

			<Filters
				filters={filters}
				onChangeFilters={onChangeFilters}
				secondaryTab={secondaryTab}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			{activeTab === 'enrichment_requests' && (
				<div className={styles.actions}>

					<Button
						size="lg"
						themeType="primary"
						style={{ marginRight: '8px' }}
                        // eslint-disable-next-line no-undef
						onClick={() => window.open(URL, '_blank')}
					>
						<IcMDownload width={16} height={16} style={{ marginRight: '10px' }} />
						Download

					</Button>

				</div>
			)}
		</div>

	);
}

export default Header;
