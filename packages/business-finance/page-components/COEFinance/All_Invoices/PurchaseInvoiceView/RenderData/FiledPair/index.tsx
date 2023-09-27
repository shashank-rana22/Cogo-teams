import { Tooltip, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import { handleBillType } from '../../../../utils/getHandleBillType';

import styled from './styles.module.css';

interface ItemProps {
	billType:string,
	billDocumentUrl:string,
	serviceType:string,
	billNumber:string,
	isProforma:boolean,
	jobNumber:string,
}
interface Props {
	itemData:ItemProps;
	field:{
		topKey:object,
		bottomKey:object,
		label :string
	}
}

const { SHIPMENT_ROUTE_MAPPING } = GLOBAL_CONSTANTS;

const MAX_LEN_FOR_INVOICE_TEXT = 11;
const MAX_LEN_FOR_SID_TEXT = 10;
const BILLNUMBER_LENGTH = 0;
function FieldPair({
	itemData = {
		billType        : '',
		billDocumentUrl : '',
		serviceType     : '',
		billNumber      : '',
		isProforma      : false,
		jobNumber       : '',
	}, field = {
		topKey    : {},
		bottomKey : {},
		label     : '',
	},
}:Props) {
	const router = useRouter();
	const {
		billType = '',
		billNumber = '',
		isProforma, billDocumentUrl, jobNumber = '', serviceType = '', shipmentId = '',
	} = itemData;

	const handleOnClick = () => {
		if (shipmentId) {
			router.push(`/booking/${SHIPMENT_ROUTE_MAPPING[serviceType]}/${shipmentId}`);
		}
	};

	return (
		<div>
			{field?.label === 'Invoice No.' && (
				<div>
					<div className={styled.billnumbers}>
						{billNumber.length > MAX_LEN_FOR_INVOICE_TEXT ? (
							<Tooltip
								interactive
								placement="top"
								content={billNumber}
							>
								<text onClick={() => window.open(billDocumentUrl, '_blank')}>
									{`${billNumber.substring(BILLNUMBER_LENGTH, MAX_LEN_FOR_INVOICE_TEXT)}...`}
								</text>
							</Tooltip>
						) : (
							<text onClick={() => window.open(billDocumentUrl, '_blank')}>
								{billNumber}
							</text>
						)}
					</div>

					<div className={styled.lower_keys}>{handleBillType(billType, isProforma)}</div>
				</div>
			)}
			{field?.label === 'SID' && (
				<div
					className={styled.sid_container}
				>
					<text className={styled.sid} onClick={handleOnClick}>
						<Button themeType="linkUi">
							{showOverflowingNumber(jobNumber, MAX_LEN_FOR_SID_TEXT)}

						</Button>
					</text>

					<div className={styled.service_type}>{startCase(serviceType)}</div>
				</div>
			)}
		</div>
	);
}
export default FieldPair;

// onClick={() => Router.push(`/booking/${SHIPMENT_ROUTE_MAPPING[shipmentType]}/${shipmentId}`)}
