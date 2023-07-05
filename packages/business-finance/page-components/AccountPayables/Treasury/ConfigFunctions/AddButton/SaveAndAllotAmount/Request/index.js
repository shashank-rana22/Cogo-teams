import { Button, Tooltip } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import useApproveRejectFund from '../../../../hooks/useApproveRejectFund';

import EditAmount from './EditAmount';
import styles from './styles.module.css';

const geo = getGeoConstants();

function Request({ item, index, currency, refetch }) {
	const { onApprove, onReject, loadingOnReject, loadingOnApprove } =		useApproveRejectFund({ item, refetch });

	const { requestedBy, createdAt, remark } = item || {};

	const {
		control,
		fields,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm();
	const editAmount = watch('requestedAmount');

	return (
		<div>
			<div className={styles.request_container}>
				<div className={styles.column1}>
					<div className={styles.request_text}>
						{' '}
						Request
						{' '}
						{index + 1}
					</div>
					<div className={styles.created}>
						{formatDate({
							date       : createdAt,
							dateFormat : geo.formats.date.default,
							timeFormat : geo.formats.time['12hrs'],
							formatType : 'dateTime',
						})}
					</div>
					<div className={styles.requested_by}>{requestedBy}</div>
					<EditAmount
						itemData={item}
						currency={currency}
						fields={fields}
						errors={errors}
						handleSubmit={handleSubmit}
						setValue={setValue}
						control={control}
					/>
					<Tooltip
						interactive
						placement="top"
						animation="shift-toward"
						content={remark}
						theme="light"
					>
						<div className={styles.remarks_div}>
							<IcMInfo />
						</div>
					</Tooltip>
				</div>
				<div className={styles.column2}>
					<Button
						size="sm"
						disabled={editAmount < 0 || loadingOnApprove}
						onClick={handleSubmit(onApprove)}
						style={{ marginRight: '12px' }}
					>
						Approve
					</Button>
					<Button
						size="sm"
						disabled={loadingOnReject}
						onClick={handleSubmit(onReject)}

					>
						Reject
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Request;
