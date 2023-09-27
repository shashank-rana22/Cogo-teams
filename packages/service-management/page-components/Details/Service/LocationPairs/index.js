import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import ListPagination from '../../../../common/ListPagination';

import styles from './styles.module.css';

function LocationPairs({ locations = [], service = '', data = {}, filters = {}, setFilters = () => {} }) {
	if (isEmpty(locations)) {
		return <div className={styles.empty_state}>No Location Pairs Added</div>;
	}

	const TeusUnitCheck = ['air_freight', 'air_customs', 'air-local-agents'].includes(
		service,
	);
	const paginationProps = { data, filters, setFilters };

	return (
		<div>
			{data?.total_count > data?.page_limit && <ListPagination paginationProps={paginationProps} />}
			<div className={styles.parent}>
				{(locations || []).map((location) => (

					<div className={styles.content} key={location}>
						<div className={styles.locations}>
							<Tooltip
								placement="bottom"
								content={location?.origin_location?.name}
							>
								<div className={styles.port}>{location?.origin_location?.name}</div>

							</Tooltip>
							<IcMPortArrow />
							<Tooltip content={location?.destination_location?.name} placement="bottom">
								<div className={styles.port}>{location?.destination_location?.name}</div>
							</Tooltip>
						</div>
						<div className={styles.teus}>
							{location.total_teus}
							{' '}
							{TeusUnitCheck ? 'Kgs' : 'Teus'}
						</div>
					</div>
				))}
			</div>
			{data?.total_count > data?.page_limit ? <ListPagination paginationProps={paginationProps} /> : null}
		</div>
	);
}

export default LocationPairs;
