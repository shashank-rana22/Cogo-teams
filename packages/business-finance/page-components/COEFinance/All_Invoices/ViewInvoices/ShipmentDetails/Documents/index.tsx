import React  from "react";
import {Button} from '@cogoport/components';
import {IcMDownload} from '@cogoport/icons-react';
import {formatDate} from '../../../../../commons/utils/formatDate'
import {startCase} from '@cogoport/utils';
import List from '../../../../../commons/List/index';
import config from '../../../../configurations/SHIPMENT_DOCUMENTS_CONFIG';
import useShipmentDocument from "../../../../hook/useShipmentDocument";
import { saveAs } from "file-saver";
import styles from './styles.module.css';

interface  DocumentsInterface {
    shipmentId:string
}

const Documents =({shipmentId=''}:DocumentsInterface)=>{
    const {data:documentData, loading} = useShipmentDocument(shipmentId);
    
    const functions={
        DocumentTypeFunc: (item:any) => <p>{startCase(item?.document_type)}</p>,
        UploadedOnFunc: (item:any)=> <p>
            {item?.uploaded_at ? formatDate(item?.uploaded_at, 'dd/MMM/yyyy',{},true) : null}
            </p>,
        viewFunc: (item:any)=>{
            return <> {item?.document_url ? <Button 
                                themeType="secondary"
                                size="xs" 
                                onClick={() => window.open(item?.document_url, '_blank')}>
                                View
                               </Button> :null}
                               </>
                               },
        downloadFunc: (item:any) => {
         return <>
             {item?.document_url ? <div className={styles.download} onClick={() => saveAs(item?.document_url)}>
                <IcMDownload height={20} width={20}/>
                 </div> : null}
             </>},
    };
    return(
        <div>
             <List config={config}  itemData={documentData} functions={functions} loading={loading}/>
        </div>
    )
}
export default Documents