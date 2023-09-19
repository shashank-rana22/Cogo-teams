import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { v1 as uuid } from 'uuid';

import ListPagination from '../../../common/ListPagination';

import styles from './styles.module.css';

function LocationPairs({ locations = [], service = '', data = {}, filters = {}, setFilters = () => {} }) {
	if (isEmpty(locations)) {
		return <div className={styles.empty_state}>No Location Pairs Addeed</div>;
	}

	const TeusCheck = ['air_freight', 'air_customs', 'air-local-agents'].includes(
		service,
	);

	const paginationProps = { data, filters, setFilters };

	return (
		<div>
			<ListPagination paginationProps={paginationProps} />
			<div className={styles.parent}>
				{(locations || []).map((location, index) => (
					<div className={styles.content} key={`${`${index}${uuid()}`}`}>
						<div className={styles.locations}>
							<div className={styles.port}>{location.origin_location?.name}</div>
							<IcMPortArrow />
							<div className={styles.port}>{location.destination_location?.name}</div>
						</div>
						<div className={styles.teus}>
							{location.total_teus}
							{' '}
							{TeusCheck ? 'Kgs' : 'Teus'}
						</div>
					</div>
				))}
			</div>
			<ListPagination paginationProps={paginationProps} />
		</div>
	);
}

export default LocationPairs;
