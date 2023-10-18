import { Input, Button, Select, SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters';
import PayRunModal from '../PayrunModal';

import { filterControls } from './filterControls';
import styles from './styles.module.css';

function SelectFilters({ filters = {}, setFilters = () => {}, activeEntity = '', createButton = '' }) {
	const [showPayRunModal, setshowPayRunModal] = useState(false);
	const {
		search = '', documentType = '',
		dateRange = { startDate: new Date(), endDate: new Date() },
	} = filters || {};

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<Filter
					controls={filterControls}
					filters={filters}
					setFilters={setFilters}
				/>

				<Select
					value={documentType}
					onChange={(e) => setFilters((prev) => ({ ...prev, documentType: e }))}
					placeholder="Select Advance Payment Type"
					size="sm"
					isClearable
					options={[
						{
							label : 'Container Security Deposit',
							value : 'CONTAINER_SECURITY_DEPOSIT',
						},
						{
							label : 'Pre Deposit Amount',
							value : 'PRE_DEPOSIT_AMOUNT',
						},
					]}
				/>

				<SingleDateRange
					name="date"
					isPreviousDaysAllowed
					onChange={(e) => {
						setFilters((prev) => (
							{ ...prev, dateRange: e || { startDate: '', endDate: '' } }
						));
					}}
					value={dateRange}
					dateFormat={GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']}
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
								className={styles.search_icon}
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
