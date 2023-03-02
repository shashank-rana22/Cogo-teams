import { Button } from '@cogoport/components';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import Filters from './Filters';
import styles from './styles.module.css';

// eslint-disable-next-line max-len
const URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b5fcd0194dfd90caaf67d4f75f560739/to_enrich_business_name.csv';

function Header(props) {
	const {
		filters,
		onChangeFilters,
		activeTab,
		debounceQuery,
		searchValue,
		setSearchValue,
		setShowUpload,
	} = props;

	return (
		<div className={styles.header}>

			<Filters
				filters={filters}
				searchValue={searchValue}
				debounceQuery={debounceQuery}
				setSearchValue={setSearchValue}
				onChangeFilters={onChangeFilters}
			/>

			{activeTab === 'enrichment_requests' && (
				<div className={styles.actions}>

					<Button
						size="lg"
						themeType="secondary"
						style={{ marginRight: '12px' }}
						// eslint-disable-next-line no-undef
						onClick={() => window.open(URL, '_blank')}
					>
						<IcMDownload width={16} height={16} style={{ marginRight: '4px' }} />
						Download
					</Button>

					<Button
						size="lg"
						themeType="primary"
						onClick={() => setShowUpload(true)}
					>
						<IcMCloudUpload width={16} height={16} style={{ marginRight: '4px' }} />
						Upload
					</Button>

				</div>
			)}
		</div>

	);
}

export default Header;
