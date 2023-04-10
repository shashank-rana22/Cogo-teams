import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import PayRunModal from '../PayrunModal';

import { filterControls } from './filterControls';
import styles from './styles.module.css';

interface FilterProps {
	filters:object,
	setFilters: (p:object) => void,
	activeEntity?:string;
	createButton?:string;
}

function SelectFilters({ filters, setFilters, activeEntity, createButton }:FilterProps) {
	const [showPayRunModal, setshowPayRunModal] = useState(false);
	return (
		<div className={styles.container}>
			<div>
				<Filter
					controls={filterControls}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			<div className={styles.search_filter}>
				<div>
					<Input
						placeholder="Search by Shipment ID/Incident No."
						size="sm"
						style={{ width: '340px' }}
						suffix={(
							<IcMSearchlight
								height={20}
								width={20}
								color="#CACACA"
								style={{ marginRight: '10px' }}
							/>
						)}
					/>
				</div>
				{createButton === 'createButton'
				&& (
					<div>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => {
								setshowPayRunModal(true);
							}}
						>
							Create Pay Run
						</Button>
					</div>
				)}
			</div>
			{showPayRunModal && (
				<PayRunModal
					show={showPayRunModal}
					setShow={setshowPayRunModal}
					activeEntity={activeEntity}
				/>
			)}
		</div>
	);
}

export default SelectFilters;
