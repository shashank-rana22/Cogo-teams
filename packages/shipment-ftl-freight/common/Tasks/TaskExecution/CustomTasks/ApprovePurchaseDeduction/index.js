import {
	Button,
	Toast,
	Tooltip,
	Checkbox,
} from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useBulkUpdate from './hooks/useBulkUpdate';
import useGetCNDetails from './hooks/useGetCNDetails';
import useGetDeductionDetails from './hooks/useGetDeductionDetails';
import Loading from './Loading';
import styles from './styles.module.css';

const OK_RESPONSE_STATUS = 200;
const DEFAULT_AMOUNT = 0;

function ApprovePurchaseDeduction({
	shipment_data = {},
	task = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const { data: CNData } = useGetCNDetails({ shipment_data });

	const optionsForCNNumber = (CNData?.list || [])
		.filter((item) => item?.status === 'approved')
		.map((item) => ({
			label : item?.cn_number,
			value : item?.id,
		}));

	const {
		control,
		watch,
	} = useForm();

	const watchCN = watch('cn_number');

	const { data } = useGetDeductionDetails(shipment_data, watchCN);

	const dataLength = (data?.partial || data?.revoke || []).length;

	const [selected, setSelected] = useState(new Array(dataLength).fill(false));

	const { handleBulkPayload, handlePendingTask } = useBulkUpdate();

	const submitTask = async () => {
		const response = await handleBulkPayload({
			selected,
			shipment_data,
			watchCN,
		});
		if (response?.status === OK_RESPONSE_STATUS) {
			const taskResponse = await handlePendingTask({ task });
			if (taskResponse?.status === OK_RESPONSE_STATUS) {
				Toast.success('Task Completed Successfully');
				refetch();
				onCancel();
			}
		}
	};

	const handleCheckboxChange = (idx, item) => {
		setSelected((prev) => {
			const tempPrev = prev;
			tempPrev[idx] = tempPrev[idx] ? false : item;
			return [...tempPrev];
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.selectControllerDiv}>
				<div className={styles.title}>Select CN Number</div>
				<SelectController
					style={{ maxWidth: '350px', minWidth: '300px' }}
					size="sm"
					name="cn_number"
					placeholder="Select CN"
					control={control}
					options={optionsForCNNumber}
					rules={{
						required: { value: true, message: 'CN required' },
					}}
				/>
			</div>

			<div className={styles.outerCard}>
				<div className={styles.upperCard}>
					<div className={styles.inputContainer}>
						<div className={styles.inputField}>
							<div className={styles.cNLabel}>CN Type: </div>
							{' '}
							{data?.revoked ? <div>100</div> : null}
							{data?.partial ? <div> Partial</div> : null}
							{!data?.revoked && !data?.partial ? <div> - </div> : null}
						</div>
						<div className={styles.inputField}>
							<div className={styles.cNLabel}>CN Status: </div>
							{' '}
							<div>CN Accepted</div>
						</div>
						<div className={styles.inputField}>
							<div className={styles.cNLabel}>Subsequent Sales Invoice: </div>
							{' '}
							{data?.revoke ? (
								<div>{data?.new_ic_status}</div>
							) : (
								<div> Pending</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.cNCard}>
					<div className={styles.inputContainer}>
						<div className={styles.inputField}>
							<div className={styles.label}>Reason</div>
						</div>
						<div className={styles.inputField}>
							<div className={styles.label}>Line Item</div>
						</div>
						<div className={styles.inputField}>
							<div className={styles.label}>Unit</div>
						</div>
						<div className={styles.inputField}>
							<div className={styles.label}>Currency</div>
						</div>
						<div className={styles.inputField}>
							<div className={styles.label}>Deducted Amount</div>
						</div>
					</div>
				</div>
				{isEmpty(data) ? (
					<Loading watchCN={watchCN} />
				) : (
					(data?.partial || data?.revoked || []).map((item, index) => {
						const {
							remarks = '',
							name = '',
							unit = '',
							currency = '',
							deducted_amount = '',
						} = item || {};
						const key_id = JSON.stringify(item);
						return (
							<div className={styles.cardItems} key={key_id}>
								<Checkbox
									style={{ marginRight: '30px' }}
									checked={selected[index]}
									onChange={() => handleCheckboxChange(index, item)}
								/>

								<div className={styles.tooltip_text}>
									<Tooltip
										placement="bottom"
										theme="light"
										content={startCase(remarks) || '-'}
										interactive
										animation="shift-away"
										maxWidth="none"
									>
										<div className={styles.items}>{startCase(remarks) || '-'}</div>
									</Tooltip>
								</div>

								<div className={styles.items}>{name || '-'}</div>
								<div className={styles.items}>{startCase(unit) || '-'}</div>
								<div className={styles.items}>{currency || '-'}</div>
								<div className={styles.items}>{deducted_amount || DEFAULT_AMOUNT}</div>
							</div>
						);
					})
				)}
			</div>
			<div className={styles.buttonWrapper}>
				<Button className="secondary md " onClick={() => onCancel()}>
					Cancel
				</Button>
				<Button className={styles.right} onClick={submitTask}>
					Approve
				</Button>
			</div>
		</div>
	);
}

export default ApprovePurchaseDeduction;
