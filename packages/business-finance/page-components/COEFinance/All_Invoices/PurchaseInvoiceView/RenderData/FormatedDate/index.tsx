import React from 'react'
import { format } from '@cogoport/utils';
import styled from './styles.module.css'
import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice'
import {formatDate} from '../../../../../commons/utils/formatDate'
import { GenericObject } from '../../../../../commons/Interfaces/index';


interface props{
    item:GenericObject
    field:{
        key:string
    }
}
function FormatedDate({item, field}:props) {

   const getCreatedDate =  formatDate(item?.createdDate, 'dd MMM yy | hh:mm a');
   const getBillDate =  format(item?.billDate, 'dd/MMM/yyyy');
   const getDueDate =  format(item?.dueDate, 'dd/MMM/yyyy');
    

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
             <text>{getFormattedPrice(item?.grandTotal,item?.billCurrency)}</text>
        </div>
        }
       
    </div>
  )
}

export default FormatedDate;