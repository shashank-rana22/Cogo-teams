import { Button } from '@cogoport/components';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import useDownloadEnrichmentCsv from '../../../hooks/useDownloadEnrichmentCsv';

import Filters from './Filters';
import styles from './styles.module.css';

// eslint-disable-next-line max-len
// const URL = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/bd4627da374e4fe2c49784f166f7f29b/feedback_response_sample.csv';

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

	const { loading, onDownload } = useDownloadEnrichmentCsv();

	// console.log('csv_url :: ', csv_url);

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
						// onClick={() => window.open(URL, '_blank')}
						disabled={loading}
						onClick={onDownload}
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
