import React from 'react'
import { format } from '@cogoport/utils';
import styled from './styles.module.css'

function FormatedDate({item={}, field={}}) {

   const getCreatedDate =  format(item?.createdDate, 'dd/MM/yyyy');
   const getBillDate =  format(item?.billDate, 'dd/MM/yyyy');
   const getDueDate =  format(item?.dueDate, 'dd/MM/yyyy');
    

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
        <div>
            <text className={styled.billCurrency}>{item?.billCurrency}</text>
             <text>{item?.grandTotal}</text>
        </div>
        }
       
    </div>
  )
}

export default FormatedDate;