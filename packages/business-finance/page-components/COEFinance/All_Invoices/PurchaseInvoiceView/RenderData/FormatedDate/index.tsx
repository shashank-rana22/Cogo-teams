import React from 'react'
import { format } from '@cogoport/utils';
import { IcMInfo } from '@cogoport/icons-react';
import { Tooltip } from '@cogoport/components';
import styled from './styles.module.css'
import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice'
import {formatDate} from '../../../../../commons/utils/formatDate'

interface itemProps {
    createdDate:Date,
    billDate:Date,
    dueDate:Date,
    billCurrency:string,
    subTotal:number,
    grandTotal:number,
}
interface Props{
    item:itemProps;
    field:{
        key:string
    }
}

function FormatedDate({item, field}:Props) {

   const getCreatedDate =  formatDate(item?.createdDate, 'dd/MMM/yy | hh:mm a');
   const getBillDate =  formatDate(item?.billDate, 'dd/MMM/yyyy');
   const getDueDate =  formatDate(item?.dueDate, 'dd/MMM/yyyy');

   const content=(
       <>
        <div className={styled.preTax}>Pre Tax :
           <text className={styled.preTaxAmount}>
            {getFormattedPrice(item?.subTotal,item?.billCurrency)} 
            </text>
        </div>
        <div className={styled.postTax}>Post Tax: 
        <text className={styled.postTaxAmount}>
            {getFormattedPrice(item?.grandTotal,item?.billCurrency)} 
            </text>
        </div>
    </>
   )
    

  return (
    <div>
        {field?.key==='createdDate' &&
            <div>{getCreatedDate}</div>
        }
        {field?.key==='billDate' &&
            <div>{getBillDate}</div>
        }
        {field?.key==='dueDate' &&
            <div>{getDueDate}</div>
        }
        {field?.key==='grandTotal' &&
        <div className={styled.invoiceAmount}>
             <text>
                 {getFormattedPrice(item?.grandTotal,item?.billCurrency)}
            </text>

             <Tooltip placement="top" content={content}>
             <div className={styled.IcMinIcon}>
                    <IcMInfo  width='16px' height="16px"/>
             </div>
            </Tooltip> 
        </div>
        }
       
    </div>
  )
}

export default FormatedDate;