import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { IcMUsersManageAccounts } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';

import SearchInput from '../../../../common/SearchInput';

import CreateBulkFeedbackRequest from './CreateBulkFeedbackRequest';
import styles from './styles.module.css';

function Header(props) {
	const {
		refetch = () => {},
		refetchStats = () => {},
		debounceQuery,
		searchValue = '',
		setSearchValue = () => {},
		authRoleId = '',
	} = props;

	const geo = getGeoConstants();

	const router = useRouter();

	const redirectToSheets = () => {
		router.push('/enrichment/sheets');
	};

	const redirectToUsers = () => {
		router.push('/enrichment/user-management');
	};

	const isEnrichmentManager = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId);

	return (
		<div className={styles.header}>

			<ScopeSelect size="md" />

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
					onClick={() => redirectToSheets()}
					style={{ marginLeft: '12px' }}
				>
					Bulk Enrichment
				</Button>
				{isEnrichmentManager && (
					<>
						<Button
							size="md"
							type="button"
							themeType="secondary"
							onClick={() => redirectToUsers()}
							style={{ marginLeft: '12px' }}
						>
							<IcMUsersManageAccounts width={16} height={16} style={{ marginRight: '4px' }} />

						</Button>

						<CreateBulkFeedbackRequest
							refetch={refetch}
							refetchStats={refetchStats}
						/>
					</>
				)}

			</div>

		</div>
	);
}

export default Header;
