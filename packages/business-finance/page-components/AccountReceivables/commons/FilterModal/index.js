import { Modal, Button } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import { invoiceMoreFilter } from '../../Utils/invoicelistFilter';

import styles from './styles.module.css';

function FilterModal({ filters, setFilters, clearFilter }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
		}));
	}, [setFilters]);

	const handleClose = () => {
		clearFilter();
		setShowModal(false);
	};

	return (
		<div>
			<Modal
				size="md"
				placement="center"
				scroll={false}
				show={showModal}
				onClose={() => {
					handleClose();
				}}
			>
				<Modal.Header
					title={(
						<div className={styles.currencys}>
							MORE FILTERS
						</div>
					)}
				/>

				<Modal.Body>
					<div className={styles.container_filter}>
						<Filter
							controls={invoiceMoreFilter()}
							filters={filters}
							setFilters={setFilters}
						/>
					</div>
					<div className={styles.buttons}>
						<div className={styles.clear}>
							<Button
								themeType="secondary"
								onClick={() => {
									clearFilter();
									setShowModal(false);
								}}
							>
								Clear Filters
							</Button>
						</div>
						<div>
							<Button
								onClick={() => {
									setShowModal(false);
								}}
							>
								Apply
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<div
				role="presentation"
				className={styles.filter_button}
				onClick={() => {
					setShowModal(true);
				}}
			>
				More Filters
				{' '}
				<span className={styles.icon}>
					<IcMFilter />
				</span>
			</div>
		</div>
	);
}

export default FilterModal;
