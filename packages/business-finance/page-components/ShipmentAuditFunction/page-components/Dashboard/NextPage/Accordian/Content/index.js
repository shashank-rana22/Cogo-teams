import { Button, Modal, Textarea } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from './ItemList';
import Services from './Services';
import styles from './styles.module.css';

export default function Content({
	toggleAccordion,
	columnIndex,
	index,
}) {
	const [queryModalShow, setQueryModalShow] = useState(false);
	const [acceptModalShow, setAcceptModalShow] = useState(false);
	const [remarkValue, setRemarkValue] = useState('');
	const [activeService, setActiveService] = useState('Service 1');
	const servicesFromBackend = ['Service 1', 'Service 2', 'Service 3'];
	const data = [1, 2, 3, 4, 5, 6];
	const handleServiceClick = (service) => {
		setActiveService(service);
	};
	function onClose() {
		setQueryModalShow(false);
		setAcceptModalShow(false);
	}
	function handleRaiseQuery(columnIndex, index) {
		toggleAccordion(columnIndex, index);
		if (index != 5) {
			toggleAccordion(columnIndex, index + 1);
		}
		setQueryModalShow(false);
	}
	function handleSubmit(columnIndex, index) {
		toggleAccordion(columnIndex, index);
		if (index != 5) {
			toggleAccordion(columnIndex, index + 1);
		}
		setAcceptModalShow(false);
	}
	return (
		<>
			<div className={styles.service_heading}>
				<div style={{ marginBottom: '6px' }}>
					Services
				</div>
				<div className={styles.service_component}>
					<Services
						servicesFromBackend={servicesFromBackend}
						handleServiceClick={handleServiceClick}
						activeService={activeService}
					/>
				</div>
			</div>
			<div>
				<List />
			</div>
			<div className={styles.modification}>
				<div className={styles.modify_heading}>
					Modified By
				</div>
				<div className={styles.modify_content}>
					Ritik
				</div>
			</div>
			<div className={styles.modification}>
				<div className={styles.modify_heading}>
					Modified At
				</div>
				<div className={styles.modify_content}>
					00:00:00
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div />
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '10px' }}
						onClick={() => { setQueryModalShow(true); }}
					>
						Raise Query
					</Button>

					<Modal
						size="md"
						show={queryModalShow}
						onClose={() => onClose()}
						onOuterClick={() => onClose()}
						placement="center"
						scroll
					>
						<Modal.Header title="REMARK" />
						<Modal.Body>
							<div>
								Text
							</div>
							<Textarea
								name="remark"
								size="md"
								rows={4}
								cols={20}
								placeholder="Enter Remarks..."
								onChange={(e) => setRemarkValue(e)}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button
								size="md"
								themeType="primary"
								onClick={() => { handleRaiseQuery(columnIndex, index); }}
							>
								Submit
							</Button>
						</Modal.Footer>
					</Modal>

					<Button
						size="md"
						themeType="primary"
						onClick={() => { setAcceptModalShow(true); }}
					>
						Accept
					</Button>
					<Modal
						size="md"
						onClose={() => onClose()}
						onOuterClick={() => onClose()}
						placement="center"
						show={acceptModalShow}
						scroll
					>
						<Modal.Header title="REMARK" />
						<Modal.Body>
							<div>
								Text
							</div>
							<Textarea
								name="remark"
								size="md"
								rows={4}
								cols={20}
								placeholder="Enter Remarks..."
								onChange={(e) => setRemarkValue(e)}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button
								size="md"
								themeType="primary"
								onClick={() => { handleSubmit(columnIndex, index); }}
							>
								Approve
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</>
	);
}
