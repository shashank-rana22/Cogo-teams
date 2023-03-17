// import { stakeholderCheck } from '@cogoport/bookings/commons/helpers/stakeholderCheck';
import { Popover } from '@cogoport/components';
// import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOverflowDot } from '@cogoport/icons-react';
import startCase from '@cogoport/utils';
import React, { useState } from 'react';

// import SupplierReallocation from '../../../../ShipmentDetails/commons/EditCancelService/SupplierReallocation';
import CancelAdditionalService from '../../CancelAdditionalService';

import styles from './styles.module.css';

const serviceCancelAllowedBy = [
	'requested_by_importer_exporter',
	'amendment_requested_by_importer_exporter',
];

const roleForCancel = ['is_so1', 'is_so2'];

function Item({
	item = {},
	actionButton,
	status = {},
	refetch = () => {},
	services = [],
	isSeller,
}) {
	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	// const stakeholder = stakeholderCheck();

	// const role = Object.keys(stakeholder || {})?.find(
	// 	(itm) => stakeholder[itm] === true,
	// );

	// TEMPORARY
	const role = 'SUPERADMIN';

	const showCancelInfo =		serviceCancelAllowedBy.includes(item?.state)
		|| (!roleForCancel.includes(role)
			&& item?.state === 'quoted_by_service_provider');

	const showEditBtn = status?.status === 'approved';

	const serviceData = services?.filter(
		(service) => service?.service_name === item?.name,
	);
	const price = isSeller ? item?.buy_price : item?.price;

	return (
		<Container className="additional-service-item-container">
			<Row className="additional-service-item-row">
				<NameType>
					<>
						<Circle />
						<Heading className="additional-service-item-heading">
							{startCase(item?.name)}
						</Heading>
					</>
					{price ? (
						<Label>
							<Circle />
							<Heading>
								Price:
								{' '}
								{/* {formatAmount({
									amount   : price,
									currency : item?.currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})} */}
							</Heading>
						</Label>
					) : null}
				</NameType>

				{showCancelInfo || showEditBtn ? (
					<Popover
						show={show}
						theme="light-border"
						content={(
							<div>
								{showCancelInfo ? (
									<ButtonText
										onClick={() => {
											setShow(false);
											setShowCancel(true);
										}}
									>
										Cancel
									</ButtonText>
								) : null}

								{showEditBtn ? (
									<ButtonText
										onClick={() => {
											setShow(false);
											setShowEdit(true);
										}}
									>
										Edit
									</ButtonText>
								) : null}
							</div>
						)}
						interactive
					>
						<div>
							<IcMOverflowDot
								style={{ width: '10px', height: '10px', cursor: 'pointer' }}
								onClick={() => setShow(!show)}
							/>
						</div>
					</Popover>
				) : null}
			</Row>

			<Row className="status">
				<Tag className={status?.status}>{status?.statusName}</Tag>
				{actionButton}
			</Row>

			{showCancel ? (
				<CancelAdditionalService
					id={item?.id}
					showCancel={showCancel}
					setShowCancel={setShowCancel}
					setShow={setShow}
				/>
			) : null}
			{/*
			{showEdit ? (
				<SupplierReallocation
					show={showEdit}
					setShow={setShowEdit}
					serviceData={serviceData}
					refetchServices={refetch}
					isAdditional
				/>
			) : null} */}
		</Container>
	);
}

export default Item;
