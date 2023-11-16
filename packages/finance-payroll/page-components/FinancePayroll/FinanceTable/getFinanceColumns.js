import { Button, cl, Modal } from '@cogoport/components';
import { UploadController, SelectController, InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDownload, IcMCloudUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getFinanceColumns = ({
	STATUS_OPTIONS = [],
	updatePayroll = () => {}, createDownload = () => {},
	control, show, setShow, handleSubmit, watch, errors,
}) => ([
	{
		Header   : 'NAME',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>{startCase(item.batch_name) || '-'}</span>
			</div>
		),
		id: 'name',
	},
	{
		Header   : 'TYPE',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>{item.name || 'Payroll'}</span>
			</div>
		),
		id: 'location',
	},
	{
		Header   : 'DATE RECEIVED',
		accessor : (item = {}) => (
			<div className={styles.overflow_text}>
				{item.approved_on ?	formatDate({
					date       : item.approved_on,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				}) : '-'}
			</div>
		),
		id: 'date',
	},
	{
		Header   : 'REMARKS',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>
					{item.remarks || '-'}
				</span>
			</div>
		),
		id: 'remarks',
	},
	{
		Header   : 'AMOUNT',
		accessor : (item = {}) => (
			<div>
				<span className={styles.black_text}>
					₹
					{' '}
					{item.total_net_payout || '-'}
				</span>
			</div>
		),
		id: 'amount',
	},
	{
		Header   : 'ATTACHMENTS',
		accessor : (item = {}) => {
			const handleDownload = (id) => {
				createDownload({ id });
			};
			return (
				<div className={styles.download}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginLeft: '6px' }}
						aria-hidden
						onClick={() => handleDownload(item.id)}
					>
						<span>Download</span>
						<IcMDownload
							style={{ marginLeft: '4px' }}
							width={14}
							height={14}
						/>
					</Button>
				</div>
			);
		},
		id: 'actions',
	},

	{
		Header   : 'STATUS',
		accessor : (item = {}) => {
			const getStatusValue = (value) => {
				const status = STATUS_OPTIONS.find((option) => option.value === value);
				return status ? status.value : null;
			};
			const onSubmit = (values) => {
				const payload = {
					payroll_id       : item.id,
					status           : getStatusValue(values?.[`order_status_${item.id}`]),
					document_url     : values?.[`payroll_number_document_url_${item.id}`]?.finalUrl || null,
					rejection_reason : values?.[`rejection_reason_${item.id}`],
				};
				updatePayroll({ payload });
			};

			return (
				<div className={cl`${styles.statuses} ${styles[item.status]}`}>
					{(item.status === 'paid' || item.status === 'failed') ?	(
						<div className={styles.statuses}>
							{item.status === 'approved' ? 'Pending'	: startCase(
								item.status,
							)}
						</div>
					)
						: (
							<div className={styles.download}>
								<div
									className={styles.statuses}
									aria-hidden
									onClick={() => setShow(item.id)}
								>
									{item.status === 'approved' ? 'Pending'	: startCase(
										item.status,
									)}
									<IcMCloudUpload
										style={{ marginLeft: '4px' }}
										width={14}
										height={14}
									/>
								</div>

								<Modal
									size="md"
									show={show === item.id}
									onClose={() => setShow(false)}
									placement="center"
									className={styles.modal}
								>
									<Modal.Header title="Are you sure?" />
									<Modal.Body>
										<div style={{ marginBottom: '4px' }}>Select Status</div>
										<SelectController
											placeholder="Status"
											name={`order_status_${item.id}`}
											options={(STATUS_OPTIONS || [])
												.filter((option) => option.label !== 'Pending')}
											control={control}
											isClearable
											style={{ marginBottom: '16px' }}
										/>
										{watch(`order_status_${item.id}`) === 'paid' && (
											<>
												<UploadController
													className="payroll_document"
													name={`payroll_number_document_url_${item.id}`}
													control={control}
													rules={{ required: true }}
												/>

												{errors?.[`payroll_number_document_url_${item.id}`]
													? <div className={styles.errors}>*required</div> : null}
											</>
										)}
										{	watch(`order_status_${item.id}`) === 'failed' && (
											<>
												<InputController
													placeholder="Enter Remarks"
													name={`rejection_reason_${item.id}`}
													control={control}
													rules={{ required: true }}
												/>
												{errors?.[`rejection_reason_${item.id}`]
													? <div className={styles.errors}>*required</div> : null}
											</>
										)}
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={handleSubmit(onSubmit)}>OK</Button>
									</Modal.Footer>
								</Modal>
							</div>
						)}
				</div>
			);
		},
		id: 'status',
	},
]);

export default getFinanceColumns;
