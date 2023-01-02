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


const Documents =({data={}, shipmentId=''})=>{
    const {data:documentData, loading} = useShipmentDocument(shipmentId);
    console.log('document data->',documentData);
    const functions={
        DocumentTypeFunc: (item) => <p>{startCase(item?.document_type)}</p>,
        UploadedOnFunc: (item)=> <p>{formatDate(item?.uploaded_at, 'dd/MMM/yyyy')}</p>,
        viewFunc: (item)=> <Button 
                           themeType="secondary"
                            size="xs" 
                            onClick={() => window.open(item?.document_url, '_blank')}>
                              View
                             </Button>,
        downloadFunc: (item) => <div className={styles.download} onClick={() => saveAs(item?.document_url)}><IcMDownload height={20} width={20}/></div>,
    };
    return(
        <div>
             <List config={config || {}}  itemData={documentData} functions={functions} loading={loading}/>
        </div>
    )
}
export default Documents