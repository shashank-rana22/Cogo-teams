import { Modal, Button } from '@cogoport/components';

import ServiceStats from '../../../../common/ServiceStats';
import { AvgPromisedConAndContract } from '../../../../configurations/service-stats-data';
import PortsCard from '../PortsCard';

// import { PortsOriginDestinationDetailsData } from '../../../../configurations/details-ports-origin-destination';

import styles from './styles.module.css';

function ToApproveModal({ show, setShow = () => {}, selected, changeSelection = () => {}, isClickable = true }) {
	return (
		<Modal
			size="xl"
			show={show}
			onClose={() => setShow(false)}
			className={styles.modal_container}
		>
			<Modal.Header
				title={(
					<div className={styles.modal_header}>
						<h2>Preview</h2>
						<ServiceStats data={AvgPromisedConAndContract} type="preview-stats" />
					</div>
				)}
			/>
			<Modal.Body className={styles.modal_body}>
				<span className={styles.port_numbers}>
					{selected.length}
					{' '}
					Port Pairs
				</span>
				<div className={styles.ports_card}>
					{
						(selected || []).map((item) => (
							<div>
								<PortsCard
									{...item}
									data={item}
									selected={selected}
									changeSelection={changeSelection}
									isClickable={isClickable}
									source="modal"
								/>
							</div>
						))
					}
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.buttons_container}>
					<Button
						size="md"
						themeType="tertiary"
						onClick={() => setShow(false)}
					>
						Cancel
					</Button>
					<Button size="md" themeType="accent">
						Approve
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default ToApproveModal;
