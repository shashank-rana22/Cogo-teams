import { Button, Modal, Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import React, { useState, useCallback } from 'react';

import Loader from '../../common/Loader';
import SearchShipment from '../../common/SearchShipment';
import useBulkReallocate from '../../hooks/useBulkReallocate';
import useListKamDeskSurfaceShipment from '../../hooks/useListKamDeskSurfaceShipment';
import { getRoleIds, STAKEHOLDER_OPTIONS } from '../../utils/stakeHolderMapping';

import ShipmentList from './ShipmentList';
import styles from './styles.module.css';

function ReAllocation({ activeTab = '' }) {
	const [selectedShipments, setSelectedShipments] = useState(new Set());
	const [showModal, setShowModal] = useState(false);
	const [stakeholderData, setStakeholderData] = useState({ stakeholder_type: '', stakeholder: '' });
	const {
		data = {},
		loading = false,
		filters = {},
		setFilters = () => {},
		refetch = () => {},
	} = useListKamDeskSurfaceShipment({ activeTab });
	const { loading: reallocateLoading = false, bulkReallocate = () => {} } = useBulkReallocate({ list: data?.list });

	const getStakeHolderParams = useCallback(() => {
		const stakeholder = stakeholderData?.stakeholder_type || '';
		const roleIds = getRoleIds(stakeholder) || [];
		return {
			filters: {
				role_ids : roleIds,
				status   : 'active',
			},
		};
	}, [stakeholderData?.stakeholder_type]);

	return (
		<div>
			<SearchShipment setFilters={setFilters} keyName="serial_id" />
			{loading ? <Loader /> : (
				<ShipmentList
					data={data}
					filters={filters}
					selectedShipments={selectedShipments}
					setSelectedShipments={setSelectedShipments}
					setFilters={setFilters}
					loading={loading}
					setShowModal={setShowModal}
				/>
			)}
			{showModal ? (
				<Modal show={showModal} onClose={() => setShowModal(false)}>
					<Modal.Header title="Re-Allocate StakeHolders" />
					<Modal.Body className={styles.modal_body}>
						<div className={styles.stakeholder_div}>
							<div>Stakeholder Type</div>
							<Select
								className={styles.select}
								options={STAKEHOLDER_OPTIONS}
								value={stakeholderData?.stakeholder_type}
								onChange={(val) => setStakeholderData({ stakeholder_type: val, stakeholder: '' })}
							/>
						</div>
						<div className={styles.stakeholder_div}>
							<div>Stakeholder</div>
							<AsyncSelect
								asyncKey="partner_users"
								valueKey="user_id"
								className={styles.select}
								value={stakeholderData?.stakeholder || undefined}
								onChange={(val) => setStakeholderData((prev) => ({ ...prev, stakeholder: val }))}
								params={getStakeHolderParams()}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							loading={reallocateLoading}
							onClick={() => bulkReallocate({
								shipmentIds : selectedShipments,
								stakeholderData,
								callBack    : () => {
									refetch();
									setShowModal(false);
								},
							})}
						>
							Re-Allocate
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default ReAllocation;
