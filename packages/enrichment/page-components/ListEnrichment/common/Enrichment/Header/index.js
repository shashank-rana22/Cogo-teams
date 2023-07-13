import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';

import useDownloadEnrichmentCsv from '../../../hooks/useDownloadEnrichmentCsv';

import Filters from './components/Filters';
import GetLeadFeedbacks from './components/GetLeadFeedbacks';
import styles from './styles.module.css';

const geo = getGeoConstants();
function Header(props) {
	const {
		filters,
		onChangeFilters,
		activeTab,
		debounceQuery,
		searchValue,
		setSearchValue = () => {},
		setShowUpload = () => {},
		listRefetch = () => {},
		authRoleId,
	} = props;

	const { loading, onDownload } = useDownloadEnrichmentCsv();

	const allowedToSeeButtons = geo.navigations.enrichment.manual_enrichment;
	const allowedToCreateEnrichmentRequests = geo.navigations.enrichment.allowed_to_create_enrichment_requests;

	const third_party_enrichment_allowed_role_ids = geo.uuid.third_party_enrichment_agencies_role_ids;

	const isAllowedToGetMoreLeads = allowedToCreateEnrichmentRequests
	&& third_party_enrichment_allowed_role_ids.includes(authRoleId);

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
				<div>
					{allowedToSeeButtons && (
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
					{isAllowedToGetMoreLeads && <GetLeadFeedbacks refetch={listRefetch} />}
				</div>
			)}

		</div>

	);
}

export default Header;
