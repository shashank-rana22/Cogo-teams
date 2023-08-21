import dynamic from 'next/dynamic';

import DetentionDemurrage from '../../../../common/D&D';
import Filters from '../../../../common/Filters';

import RefreshRate from './RefreshRate';
import styles from './styles.module.css';

const CopyUrl = dynamic(() => import('./CopyUrl'), { ssr: false });

function Header({
	details = {},
	filters = {},
	setFilters = () => {},
	refetch = () => {},
	total_rates_count = 0,
	loading = false,
	openAccordian = '',
	setOpenAccordian = () => {},
	showFilterModal = false,
	setShowFilterModal = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.count}>
				{`${total_rates_count} Results Found for your search`}
			</div>

			<div className={styles.filters_container}>
				<DetentionDemurrage details={details} refetch={refetch} />

				<Filters
					showFilterModal={showFilterModal}
					setShowFilterModal={setShowFilterModal}
					data={details}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
					openAccordian={openAccordian}
					setOpenAccordian={setOpenAccordian}
				/>

				<RefreshRate refetch={refetch} details={details} />

				<CopyUrl details={details} />
			</div>
		</div>

	);
}

export default Header;
