import React from 'react';
import {useRouter} from '@cogoport/next';
import {IcMFship, IcMPortArrow} from '@cogoport/icons-react';
import {Tags} from '@cogoport/components';
import styles from './styles.module.css';
import TimeLine from '../TimeLine/index';
import useListShipment from '../../../../hook/useListShipment';

const Details = ({jobNumber,orgId}) => {
    const {data} = useListShipment(jobNumber);
	
	const Router=useRouter();

return(
<div>	
 <div className={styles.container}>
	<div className={styles.subDiv}>
		<div className={styles.bold}>Legend Store Private...</div>
		<div>PO Number 13313102 </div>
	</div>

	<div className={styles.flex}>
		<div className={styles.icon}><IcMFship/></div>
         <div>
			 <div>Europe</div>
			 <div className={styles.bold}>Paris > Copenhagen</div>
		 </div>
		 <div className={styles.arrow}><IcMPortArrow/></div>
		 <div>
			 <div>Europe</div>
			 <div className={styles.bold}>Paris > Copenhagen</div>
		 </div>
	</div>

	<div className={styles.tags}>
		<Tags themeType="grey">General Cargo</Tags>
		<Tags  themeType="grey">Textiles. HS: 5911</Tags>
	</div>
	<a className={styles.flexDiv} onClick={()=>Router.push(`/shipments/${orgId}`)}>
		Go to SID ->
	</a>
</div>

<div className={styles.timelineContainer}>
     <TimeLine/>
</div>
</div>
)
};

export default Details;
