import { Button, Modal, Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState, useEffect } from 'react';

import useUpdateNextPayroll from '../../../../hooks/useUpdateNextPayroll';

import getSelectedColumns from './getSelectedColumns';
import styles from './styles.module.css';

const DEFAULT_ARRAY_LENGTH = 10;

function FixedCard({
	selectedItems = {}, month = '',
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);

	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		setValue,
		reset,
		watch,
	} = useForm();

	const { updatePayroll } = useUpdateNextPayroll();
	const onSubmit = async (values) => {
		const groupedData = Object.entries(values).reduce((result, [key, value]) => {
			const temp = { ...result };
			const [action, id] = key.split('&');

			if (!temp[id]) {
				temp[id] = {};
			}

			temp[id][action] = value;
			return temp;
		}, {});

		const payload = Object.entries(groupedData).map(([id, val]) => ({
			id,
			...val,
		}));
		await updatePayroll({ payload });
		setShow(false);
		refetch();
	};
	const selectedIdsLength = Object.keys(selectedItems).length;
	const columns = getSelectedColumns({ control, errors, setValue, watch });

	useEffect(() => {
		reset();
	}, [reset, show]);

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Selected No. Of Employees :
				<span className={styles.span_text}>
					{' '}
					{selectedIdsLength >= DEFAULT_ARRAY_LENGTH ? selectedIdsLength : `0${selectedIdsLength}`}
				</span>
			</div>

			<div className={styles.btn}>
				<Button onClick={() => setShow(true)}>Add to next payroll</Button>
			</div>

			<Modal
				size="fullscreen"
				className={styles.modal}
				show={show}
				placement="left"
				onClose={() => setShow(false)}
			>
				<Modal.Header title="Add to Next Payroll" />
				<Modal.Body>
					<div className={styles.table_container}>
						<div className={styles.search_bar}>
							<div className={styles.heading}>
								<div className={styles.upper_heading}>
									{selectedIdsLength === GLOBAL_CONSTANTS.one ? '1 Employee Selected'
										: `${selectedIdsLength} Employees Selected`}
								</div>
								<div className={styles.lower_heading}>
									Please confirm the details below
								</div>
							</div>
							<div>
								<div className={styles.heading}>
									<div className={styles.upper_heading}>{month}</div>
									<div className={styles.lower_heading}>
										Next Payroll Cycle
									</div>
								</div>
							</div>
						</div>
						<Table columns={columns} data={Object.values(selectedItems)} />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.submit}>
						<Button
							themeType="secondary"
							onClick={() => { setShow(false); }}
						>
							Cancel
						</Button>
						<Button
							themeType="accent"
							className={styles.smt_btn}
							onClick={handleSubmit(onSubmit)}
						>
							Add to next payroll

						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default FixedCard;
