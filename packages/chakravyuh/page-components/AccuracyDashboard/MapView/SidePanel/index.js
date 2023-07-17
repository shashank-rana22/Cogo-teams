import { Select, cl } from '@cogoport/components';
import { IcMArrowLeft, IcMDescendingSort } from '@cogoport/icons-react';
import React from 'react';

import Heading from '../../../../common/Heading';
import { SORT_OPTIONS } from '../../../../constants/map_constants';

import GeoCoder from './GeoCoder';
import styles from './styles.module.css';

function SidePanel({
	setView = () => {}, backView = () => {},
	isFull = false, setIsFull = () => {}, locationFilters = {}, setLocationFilters = () => {},
}) {
	return (
		<>
			<div className={cl`${styles.side_container} ${isFull && styles.hide}`}>
				<div className={styles.heading}>
					<Heading setView={setView} backView={backView} heading="Map View" />
				</div>
				<GeoCoder locationFilters={locationFilters} setLocationFilters={setLocationFilters} />
				<div className={styles.horizontal_line} />
				<div className={styles.list_container}>
					<div className={styles.list_header}>
						<h4>Nhava sheva ports</h4>
						<Select
							size="sm"
							placeholder="sort by"
							prefix={<IcMDescendingSort />}
							options={SORT_OPTIONS}
							style={{ width: '160px' }}
						/>
					</div>
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
