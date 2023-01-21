import React from 'react';
import {useRouter} from '@cogoport/next';
import styles from './styles.module.css';
import TimeLine from './TimeLine/index';
import CargoDetailPills from '../cargo-details/index';
import {DetailInterface} from '../../../../../commons/Interfaces/index';
import PortDetails  from './PortDetails';

interface Details {
	orgId:string,
    dataList:DetailInterface,
	shipmentId:string,
}
const Details = ({orgId, dataList, shipmentId}:Details) => {
	const {importer_exporter, shipment_type}=dataList || {};
	const shipmentTypeName=shipment_type?.split('_')?.join(' ')?.toUpperCase();
	const Router = useRouter();

return(
<div>	
 <div className={styles.container}>
	<div className={styles.subDiv}>
		<div className={styles.name}>{importer_exporter?.business_name || '-'}</div>
	</div>

	<div className={styles.flex}>
    <PortDetails data={dataList}/>
	</div>

	<div className={styles.tags}>
		<CargoDetailPills detail={dataList} />
	</div>
	<a className={styles.flexDiv} onClick={()=>Router.push(`/shipments/${orgId}`)}>
		Go to SID →
	</a>
</div>

<div className={styles.timelineContainer}>
     <TimeLine shipmentId={shipmentId}/>
</div>
</div>
)
};

export default Details;
