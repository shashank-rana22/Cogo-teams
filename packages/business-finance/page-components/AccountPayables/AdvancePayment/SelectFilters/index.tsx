import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import PayRunModal from '../PayrunModal';

import { filterControls } from './filterControls';
import styles from './styles.module.css';

interface FilterProps {
	search?:string,
}

interface Props {
	filters:FilterProps,
	setFilters: (p:object) => void,
	activeEntity?:string;
	createButton?:string;
}

function SelectFilters({ filters, setFilters, activeEntity, createButton }:Props) {
	const [showPayRunModal, setshowPayRunModal] = useState(false);
	const { search } = filters || {};
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
						value={search || ''}
						onChange={(value) => setFilters({
							...filters,
							search: value || undefined,
						})}
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
							onClick={() => {
								setshowPayRunModal(true);
							}}
						>
							Create Pay Run
						</Button>
					</div>
				)}
				<PayRunModal
					show={showPayRunModal}
					setShow={setshowPayRunModal}
					activeEntity={activeEntity}
				/>
			</div>
		</div>
	);
}

export default SelectFilters;
