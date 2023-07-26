import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetCsdConfigurations from '../../../../../hooks/useGetCsdConfigurations';
import useUpdateCsdConfig from '../../../../../hooks/useUpdateCsdConfig';
import CapacityDetailsTable from '../../../CapacityDetailsTable';

import styles from './styles.module.css';

function TotalShipmentCapacity({ routeLoading = false }) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const { list = [], loading: capacityDataLoading } = useGetCsdConfigurations({ source: 'capacity_page' });

	const { loading, updateCsdConfig } = useUpdateCsdConfig({ setShowModal });

	const configId = router?.query?.id;

	return (
		<div className={styles.container}>
			<h4>TOTAL SHIPMENT CAPACITY CALCULATION</h4>

			<div className={styles.exp_text}>
				<h4>
					Normalized Equivalent per Service (considered when
					multiple services are applicable for one agent)
				</h4>
				<p>
					Created on the basis of earlier Set configuration.
					All Services have been Normalized with respect to the Service with least capacity
				</p>
			</div>

			<div className={styles.table_container}>
				<CapacityDetailsTable data={list?.[GLOBAL_CONSTANTS.zeroth_index]} loading={capacityDataLoading} />
			</div>

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="secondary"
					loading={loading || routeLoading}
					onClick={() => updateCsdConfig({ status: 'draft', id: configId })}
				>
					Save As Draft

				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.btn}
					loading={loading || routeLoading}
					onClick={() => setShowModal(true)}
				>
					Activate Configuration

				</Button>
			</div>

			{showModal && (
				<Modal
					size="md"
					show={showModal}
					onClose={() => setShowModal(false)}
					placement="center"
					showCloseIcon={false}
				>
					<Modal.Header
						title="Are you sure you want to activate this configuration?"
						style={{ textAlign: 'center' }}
					/>

					<Modal.Body>
						<div className={styles.btn_container}>
							<Button
								type="button"
								loading={loading || routeLoading}
								themeType="secondary"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</Button>

							<Button
								type="button"
								loading={loading || routeLoading}
								style={{ marginLeft: '12px' }}
								onClick={() => updateCsdConfig({ status: 'active', id: configId })}
							>
								Activate
							</Button>
						</div>
					</Modal.Body>
				</Modal>
			)}

		</div>
	);
}

export default TotalShipmentCapacity;
