import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import Filters from '../Filters';

import styles from './styles.module.css';

const URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/3d4f75ca0199d79d0a66298af5006b95/Leads.xlsx';

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
