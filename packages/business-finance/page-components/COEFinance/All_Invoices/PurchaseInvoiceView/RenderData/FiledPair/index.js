import { Tooltip, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCopy } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase, copyToClipboard } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import { handleBillType } from '../../../../utils/getHandleBillType';

import styled from './styles.module.css';

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
		shipmentId      : '',
	}, field = {
		topKey    : {},
		bottomKey : {},
		label     : '',
	},
}) {
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

	const handleCopy = (val) => {
		copyToClipboard(val)
			.then(Toast.info('Copied Successfully !!'));
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
					<text className={styled.sid}>
						<IcMCopy
							onClick={() => handleCopy(jobNumber)}
							className={styled.copy_icon}
						/>
						<Button themeType="linkUi" onClick={handleOnClick}>
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
