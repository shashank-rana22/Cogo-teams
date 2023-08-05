import { Button } from '@cogoport/components';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import SearchInput from '../../../../common/SearchInput';
import useDownloadEnrichmentCsv from '../../hooks/useDownloadEnrichmentCsv';

import styles from './styles.module.css';

function Header(props) {
	const {
		debounceQuery,
		searchValue = '',
		setSearchValue = () => {},
		setShowUpload = () => {},
	} = props;

	const { loading, onDownload } = useDownloadEnrichmentCsv();

	return (
		<div className={styles.header}>

			<div className={styles.search_container}>
				<SearchInput
					size="sm"
					placeholder="Search"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
				/>
			</div>

			<div className={styles.actions}>
				<Button
					size="md"
					type="button"
					themeType="secondary"
					style={{ marginLeft: '12px' }}
					disabled={loading}
					onClick={onDownload}
				>
					<IcMDownload width={16} height={16} style={{ marginRight: '4px' }} />
					Download
				</Button>
				<Button
					size="md"
					type="button"
					themeType="primary"
					onClick={() => setShowUpload(true)}
					style={{ marginLeft: '12px' }}
				>
					<IcMCloudUpload width={16} height={16} style={{ marginRight: '4px' }} />
					Upload
				</Button>
			</div>

		</div>
	);
}

export default Header;
