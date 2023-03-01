import { Button } from '@cogoport/components';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import Filters from '../Filters';

import styles from './styles.module.css';

// eslint-disable-next-line max-len
const URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/bd4627da374e4fe2c49784f166f7f29b/feedback_response_sample.csv';

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
				onChangeFilters={onChangeFilters}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			{activeTab === 'enrichment_requests' && (
				<div className={styles.actions}>

					<Button
						size="lg"
						themeType="primary"
						style={{ marginRight: '12px' }}
						onClick={() => setShowUpload(true)}
					>
						<IcMCloudUpload width={16} height={16} style={{ marginRight: '4px' }} />
						Upload
					</Button>

					<Button
						size="lg"
						themeType="primary"
                        // eslint-disable-next-line no-undef
						onClick={() => window.open(URL, '_blank')}
					>
						<IcMDownload width={16} height={16} style={{ marginRight: '4px' }} />
						Download
					</Button>

				</div>
			)}
		</div>

	);
}

export default Header;
