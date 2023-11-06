import { Button, cl, Popover, Modal } from '@cogoport/components';
import { UploadController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown, IcMDownload, IcMCloudUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const getFinanceColumns = ({
	STATUS_OPTIONS = [],
	updatePayroll = () => {}, createDownload = () => {},
	control, show, setShow, handleSubmit,
	uploadDocument,
}) => ([
	// {
	// 	Header   : 'SL NO',
	// 	accessor : (item = {}) => (
	// 		<div>
	// 			<span className={styles.black_text}>{item.order_ticket_id|| '-'}</span>
	// 		</div>
	// 	),
	// 	id: 'order_id',
	// },
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
		Header   : 'UPLOAD RECORD',
		accessor : (item = {}) => {
			const onSubmit = (values) => {
				const payload = {
					payroll_id   : item.id,
					document_url : values?.[`payroll_number_document_url_${item.id}`].finalUrl,
				};
				uploadDocument({ payload });
			};
			return (
				<div className={styles.download}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginLeft: '6px' }}
						aria-hidden
						onClick={() => setShow(item.id)}
					>
						<span>Upload</span>
						<IcMCloudUpload
							style={{ marginLeft: '4px' }}
							width={14}
							height={14}
						/>
					</Button>

					<Modal size="md" show={show === item.id} onClose={() => setShow(false)} placement="center">
						<Modal.Header title="Are you sure?" />
						<Modal.Body>
							<UploadController
								className="payroll_document"
								name={`payroll_number_document_url_${item.id}`}
								control={control}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={handleSubmit(onSubmit)}>OK</Button>
						</Modal.Footer>
					</Modal>
				</div>
			);
		},
		id: 'upload',
	},
	{
		Header   : 'STATUS',
		accessor : (item = {}) => {
			function PopoverContent() {
				const getStatusValue = (label) => {
					const status = STATUS_OPTIONS.find((option) => option.label === label);
					return status ? status.value : null;
				};

				const handleStatusChange = (newStatus) => {
					const payload = {
						payroll_id : item.id,
						status     : getStatusValue(newStatus),
					};
					updatePayroll({ payload });
				};

				return (
					<div className={styles.popover_content}>
						{(STATUS_OPTIONS || []).map((option) => (
							<div
								key={option.label}
								className={styles.popover_item}
								aria-hidden
								onClick={() => handleStatusChange(option.label)}
							>
								{option.label}
							</div>
						))}
					</div>
				);
			}
			return (
				<div className={cl`${styles.statuses} ${styles[item.status]}`}>
					<Popover
						placement="bottom"
						render={<PopoverContent />}
					>
						<div className={styles.statuses}>
							{	startCase(
								item.status,
							)}
							<IcMArrowDown
								style={{ marginLeft: '4px' }}
								width={14}
								height={14}
							/>

						</div>
					</Popover>
				</div>
			);
		},
		id: 'status',
	},
]);

export default getFinanceColumns;
