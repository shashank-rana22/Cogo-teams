import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import useDownloadEnrichmentCsv from '../../hooks/useDownloadEnrichmentCsv';
import CreateBulkFeedbackRequest from '../CreateBulkFeedbackRequest';
import Filters from '../Filters';

import styles from './styles.module.css';

const geo = getGeoConstants();

function Header(props) {
	const {
		refetch = () => {},
		debounceQuery,
		searchValue = '',
		setSearchValue = () => {},
		setShowUpload = () => {},
		primaryTab = 'manual_enrichment',
		authRoleId = '',
	} = props;

	const { loading, onDownload } = useDownloadEnrichmentCsv();

	const allowedToCreateBulkRequest = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId);

	const COMPONENT_MAPPING = {
		file_management: (
			<>
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
			</>
		),
		manual_enrichment: (
			allowedToCreateBulkRequest ? <CreateBulkFeedbackRequest refetch={refetch} /> : null
		),
	};

	return (
		<div className={styles.header}>

			<Filters
				searchValue={searchValue}
				debounceQuery={debounceQuery}
				setSearchValue={setSearchValue}
			/>

			<div className={styles.actions}>
				{COMPONENT_MAPPING[primaryTab]}
			</div>

		</div>
	);
}

export default Header;
