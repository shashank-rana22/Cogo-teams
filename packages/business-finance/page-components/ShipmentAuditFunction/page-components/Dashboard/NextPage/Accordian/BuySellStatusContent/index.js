import { Button, Modal, Textarea } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../Content/ItemList';
import Services from '../Content/Services';

import styles from './styles.module.css';

export default function BuySellStatusContent({
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

			<div className={styles.parent_timeline}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>Invoice Number</div>
					</div>
					<div>
						<div className={styles.regular}>Invoice Number</div>
						<div>Invoice Number</div>
					</div>
				</div>
				<div className={styles.scroll}>
					<div className={styles.timeline_heading}>Timeline</div>
					<div className={styles.timeline}>
						{data.map((item, index) => (
							<div key={index} style={{ width: '200px' }}>
								<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
									<IcCFtick height="20" width="20" />
									{item !== 6 ? (<div className={styles.horizontal_rule} />) : null}
								</div>
								<div>
									<div>Finance Accepted</div>
									<div>Data</div>
									<div>Data</div>
								</div>
							</div>
						))}
					</div>
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
