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

const REQUEST_INDEX = 1;
const CHECK_AMOUNT = 0;

function Request({ item = {}, index = 0, currency = '', refetch = () => {} }) {
	const { onApprove, onReject, loadingOnReject, loadingOnApprove } =		useApproveRejectFund({ item, refetch });

	const { requestedBy, createdAt, remark } = item;

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
						{index + REQUEST_INDEX}
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
						disabled={editAmount < CHECK_AMOUNT || loadingOnApprove}
						onClick={handleSubmit(onApprove)}
						style={{
							fontSize       : '12px',
							fontWeight     : 500,
							color          : 'black',
							textDecoration : 'underline',
							background     : 'none',
							border         : 'none',
						}}
					>
						Approve
					</Button>
					<Button
						size="sm"
						disabled={loadingOnReject}
						onClick={handleSubmit(onReject)}
						style={{
							fontSize       : '12px',
							fontWeight     : 500,
							color          : '#ed3726',
							textDecoration : 'underline',
							background     : 'none',
							border         : 'none',
						}}

					>
						Reject
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Request;
