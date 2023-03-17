import { Button } from '@cogoport/components';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import useDownloadEnrichmentCsv from '../../../hooks/useDownloadEnrichmentCsv';

import Filters from './Filters';
import styles from './styles.module.css';

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
						style={{ marginLeft: '12px' }}
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
						style={{ marginLeft: '12px' }}
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
