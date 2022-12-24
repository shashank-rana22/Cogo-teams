import React from 'react';
import {Tags} from '@cogoport/components';
import styled from './styles.module.css'


const FieldPair = ({ item = {}, field = {} }) => {
    
	const { topKey = '', lowerKey = '' } = field;
	
    const handleBillType = (item:any) => {
        let invoiceType;
	if (item?.billType=== "BILL") {
			if (item?.isProforma) {
				invoiceType = 'Proforma Invoice';
			} else {
				invoiceType = 'Purchase Invoice';
			}
		}
		return invoiceType;
	};
	return (
		<div >
			{topKey && (
                <Tags >{item?.billNumber}</Tags>
			)}
			{lowerKey && (
            <div className={styled.lowerKeys}>{handleBillType(item)}</div>
				
			)}
		</div>
	);
};
export default FieldPair;
