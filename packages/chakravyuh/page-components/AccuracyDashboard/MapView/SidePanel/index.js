import { Select, cl } from '@cogoport/components';
import { countriesHash } from '@cogoport/globalization/utils/getCountriesHash';
import { IcMArrowLeft, IcMDescendingSort, IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import Heading from '../../../../common/Heading';
import { SORT_OPTIONS } from '../../../../constants/map_constants';

import GeoCoder from './GeoCoder';
import styles from './styles.module.css';

const SCOPE_MAPPING = {
	continents : 'country',
	country    : 'region',
	region     : 'ports',
};

function SidePanel({
	setView = () => {}, backView = () => {}, setHierarchy = () => {},
	isFull = false, setIsFull = () => {}, locationFilters = {}, setLocationFilters = () => {}, activeList = [],
	data = [],
}) {
	const originName = locationFilters.origin?.name || countriesHash?.[locationFilters?.origin?.id]?.name;
	const destinationType = locationFilters?.destination?.type || '';
	const destination = destinationType.includes('port')
		? locationFilters?.destination?.name : SCOPE_MAPPING[destinationType];

	const currentList = isEmpty(activeList) ? data : activeList;

	return (
		<>
			<div className={cl`${styles.side_container} ${isFull && styles.hide}`}>
				<div className={styles.heading}>
					<Heading setView={setView} backView={backView} heading="Map View" showFilterText={false} />
				</div>
				<div className={styles.sticky_container}>
					<GeoCoder
						locationFilters={locationFilters}
						setLocationFilters={setLocationFilters}
						setHierarchy={setHierarchy}
					/>
					<div className={styles.horizontal_line} />
				</div>
				<div className={styles.list_container}>
					<div className={styles.list_header}>
						<h4>
							{`${startCase(originName)} to 
							${startCase(destination || 'Countries')}`}
						</h4>
						<Select
							size="sm"
							placeholder="sort by"
							prefix={<IcMDescendingSort />}
							options={SORT_OPTIONS}
							style={{ width: '160px' }}
						/>
					</div>
					{currentList.map((item) => (
						<div key={item?.id} className={styles.card}>
							<div className={styles.left}>
								<div>
									<h4>{originName}</h4>
									<IcMPortArrow />
									<p>{item?.name}</p>

								</div>
							</div>
							<div className={styles.right}>
								<p>Deviation</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<button
				onClick={() => setIsFull((s) => !s)}
				className={cl`${styles.toggle_icon} ${isFull ? styles.rotate_toggle : ''}`}
			>
				<IcMArrowLeft />
			</button>
		</>
	);
}

export default SidePanel;
