import React from 'react';
import {useRouter} from '@cogoport/next';
import {IcMPortArrow} from '@cogoport/icons-react';
import {Tooltip} from '@cogoport/components';
import styles from './styles.module.css';
import TimeLine from './TimeLine/index';
import GetServiceInfo from '../../../../../commons/GetServiceInfo';
import CargoDetailPills from '../cargo-details/index';

interface IEInterface{
	business_name:string
}
interface PickupDropInt{
	postal_code:string,
	country:{name:string},
	display_name:string,
	name:string
}

interface ListInterface{
	importer_exporter:IEInterface,
	shipment_type:string,
	pickup:PickupDropInt,
	drop:PickupDropInt
}

interface Details {
	orgId?:string,
    dataList:ListInterface,
	shipmentId:string,
}
const Details = ({orgId, dataList, shipmentId}:Details) => {
	const {importer_exporter, shipment_type, pickup, drop}=dataList || {};
	const shipmentTypeName=shipment_type?.replaceAll('_'," ")?.toUpperCase();
	const Router = useRouter();

	const  ServiceIcon  = GetServiceInfo(shipment_type);

return(
<div>	
 <div className={styles.container}>
	<div className={styles.subDiv}>
		<div className={styles.name}>{importer_exporter?.business_name || '-'}</div>
	</div>

	<div className={styles.flex}>
		<div className={styles.icon}>
			<div>{ServiceIcon}</div> 
			<div className={styles.shipmentType}>{shipmentTypeName || '-'}</div> 
			</div>
         <div>
			 <div className={styles.postalData}>({pickup?.postal_code}){pickup?.country?.name}</div>
			 <Tooltip content={pickup?.display_name}>
			 <div className={styles.bold}>{pickup?.name}</div>
			 </Tooltip>
		 </div>
		 <div className={styles.arrow}><IcMPortArrow/></div>
		 <div>
		 <div  className={styles.postalData}>({drop?.postal_code}){drop?.country?.name}</div>
			 <Tooltip content={drop?.display_name}>
			 <div className={styles.bold}>{drop?.name}</div>
			 </Tooltip>
		 </div>
	</div>

	<div className={styles.tags}>
		<CargoDetailPills detail={dataList || {}} />
	</div>
	<a className={styles.flexDiv} onClick={()=>Router.push(`/shipments/${orgId}`)}>
		Go to SID -
	</a>
</div>

<div className={styles.timelineContainer}>
     <TimeLine shipmentId={shipmentId}/>
</div>
</div>
)
};

export default Details;
