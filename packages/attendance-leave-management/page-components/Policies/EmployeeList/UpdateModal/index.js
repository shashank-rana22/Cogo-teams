import { Modal, Button, Select, Toast } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useCreateGeoLocationMapping from '../../../../hooks/useCreateGeoLocationMapping';
import { EMPLOYEE_LIST_CONTROLS } from '../../../../utils/constants';

import styles from './styles.module.css';

function UpdateModal({
	show = false, onClose = () => {}, selectedData = {}, selectedIds = [],
	filtersData = {}, searchQuery = '', selectedLocation = '',
	isBulkUpdate = false, refetch = () => {}, setSelectedData = () => {}, setSelectedIds = () => {},
	setSelectBulk = () => {},
}) {
	const [filters, setFilters] = useState({});
	const { loading, createGeoLocationMapping } = useCreateGeoLocationMapping({ refetch, onClose });

	const { designation } = filtersData;

	useEffect(() => {
		if (!isEmpty(selectedData)) {
			setFilters({
				is_active    : selectedData.is_active ? 'active' : 'inactive',
				location_ids : selectedData.location_ids,
			});
		}
	}, [selectedData]);

	const handleSubmit = async () => {
		const { is_active, location_ids } = filters;

		if (isEmpty(location_ids)) {
			Toast.error('Please select location');
		} else {
			const idsData = isEmpty(selectedIds) ? [] : selectedIds;

			const objValues = {
				id          : !isEmpty(selectedData) ? [selectedData.employee_id] : idsData,
				object_type : isBulkUpdate ? 'Location' : 'Employee',
				is_active   : is_active === 'active',
				location_ids,
				filters     : {
					q           : isEmpty(searchQuery) ? undefined : searchQuery,
					designation : isEmpty(designation) ? undefined : designation,
					location_id : isBulkUpdate ? selectedLocation : undefined,
				},
			};

			await createGeoLocationMapping(objValues);
			setSelectedData({});
			setSelectedIds([]);
			setSelectBulk(false);
		}
	};

	return (
		<Modal size="sm" show={show} onClose={onClose} placement="top" className={styles.modal}>
			<Modal.Header title={`${isBulkUpdate ? 'Bulk' : ''} Update Data`} />
			<Modal.Body>
				<div>
					<div className={styles.controller}>
						<div className={styles.label}>
							Access Type
						</div>
						<Select
							placeholder="Select Status"
							options={[
								{
									label : 'Active',
									value : 'active',
								},
								{
									label : 'Inactive',
									value : 'inactive',
								},
							]}
							onChange={(e) => setFilters((prev) => ({ ...prev, is_active: e }))}
							value={filters.is_active || 'inactive'}
						/>
					</div>
					<div className={styles.controller}>
						{filters.is_active !== 'inactive' ?	(
							<>
								<div className={styles.label}>
									Allowed Locations
								</div>
								<AsyncSelect
									{...EMPLOYEE_LIST_CONTROLS.location}
									onChange={(e) => setFilters((prev) => ({ ...prev, location_ids: e }))}
									value={filters.location_ids}
								/>
							</>
						) : null}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" disabled={loading} className={styles.cancel_btn} onClick={onClose}>
					Cancel
				</Button>
				<Button onClick={handleSubmit} disabled={loading}>
					Submit Request
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateModal;
