import React from 'react';
import { Modal } from '@cogoport/components';
import List from '../../../../../commons/List/index';

interface DataInterface {
    currency?:string
    data?:Array<object>
}

interface VarianceViewInterface {
    show?:boolean
    onClose?:()=> void
    data: DataInterface
}
const columns = {
    showHeader         : true,
	headerStyles       : { marginBottom: '16px', borderRadius: '8px', background: '#333',marginTop:'20px' },
    bodyStyles          :{color:' #333333',fontWeight: '400',fontSize: '12px',lineHeight: '14px'},
	itemStyles         :{marginTop:'8px'},
	fields             : [
        {
            label: 'Purchase Invoice Line Item',
            func: (item:any) => (
                <div>
                    <span>
                        {(item?.purchase_line_items || [])
                            .map((charge) => charge.name)
                            .join(',')}
                    </span>
                    <span style={{ marginLeft: 4 }}>
                        ({item?.currency} {item?.purchase_invoice})
                    </span>
                </div>
            ),
            span: 5,
        },
        {
            label: 'Live Invoice Line Item',
            func: (item:any) => (
                <div>
                    <span>
                        {(item?.buy_line_items || []).map((charge) => charge.name).join(',')}
                    </span>
                    <span style={{ marginLeft: 4 }}>
                        ({item?.currency} {item?.live_invoice})
                    </span>
                </div>
            ),
            span: 5,
        },
        {
            label: 'Variance',
            func: (item:any) => `${item?.currency} ${item?.variance}`,
            span: 2,
        },
    ]
	
};

const VarianceView = ({ show, onClose, data }:VarianceViewInterface) => {

	return (
		<Modal size="lg" show={show} onClose={onClose} >
            <Modal.Body>
                <div className={styles.modalContainer}>
                        <List config={columns} itemData={data}  />
                </div>
            </Modal.Body>
		</Modal>
	);
};

export default VarianceView;
