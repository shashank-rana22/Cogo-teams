import React from 'react';
import { Modal } from '@cogoport/components';
import List from '../../../../../commons/List/index';
import {ConfigType, ListDataProps, FunctionObjects} from '../../../../../commons/Interfaces/index';
import styles from './styles.module.css'
interface DataInterface {
    currency?:string
    data?:Array<object>
}

interface VarianceViewInterface {
    show:boolean
    onClose?:()=> void
    data: ListDataProps
    loading?:boolean
}
const config:ConfigType = {
    showHeader         : true,
	headerStyles       : { marginBottom: '16px', borderRadius: '8px', background: '#333',marginTop:'20px' },
    bodyStyles          :{color:' #333333',fontWeight: '400',fontSize: '12px',lineHeight: '14px'},
	itemStyles         :{marginTop:'8px'},
	fields             : [
        {
            label: 'Purchase Invoice Line Item',
            func:'PurchaseInvoiceLineItem',
            span: 5,
        },
        {
            label: 'Live Invoice Line Item',
            func: 'LiveInvoiceLineItem',
            span: 5,
        },
        {
            label: 'Variance',
            func: 'Variance',
            span: 2,
        },
    ]
	
};

const VarianceView = ({ show, onClose, data,loading }:VarianceViewInterface) => {
    const functions:FunctionObjects={
        PurchaseInvoiceLineItem:  (item:any) => (
            <div>
                <span>
                    {(item?.purchase_line_items || [])
                        .map((charge:any) => charge.name)
                        .join(',')}
                </span>
                <span style={{ marginLeft: 4 }}>
                    ({item?.currency} {item?.purchase_invoice})
                </span>
            </div>
        ),
        LiveInvoiceLineItem: (item:any) => (
            <div>
                <span>
                    {(item?.buy_line_items || []).map((charge:any) => charge.name).join(',')}
                </span>
                <span style={{ marginLeft: 4 }}>
                    ({item?.currency} {item?.live_invoice})
                </span>
            </div>
        ),
        Variance: (item:any) =>( <div>{item?.currency} {item?.variance}</div> ),
       
    };
   
	return (
		<Modal size="lg" show={show} onClose={onClose} >
            <Modal.Header title="Variance" />
            <Modal.Body>
                <div className={styles.modalContainer}>
                <List config={config || {}}  itemData={data} loading={loading}  functions={functions}/>
                </div>
            </Modal.Body>
		</Modal>
	);
};

export default VarianceView;
