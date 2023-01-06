import React from 'react';
import {Placeholder} from '@cogoport/components';
import TimeLineItem from './TimeLineItem/index';
import useGetShipmentTimeLine from '../../../../../hook/useGetShipmentTimeLine';
import styles from './styles.module.css';

interface Int{
	shipmentId:string,
}

const TimeLine = ({shipmentId}:Int) => {
    const {data: timelineData, loading} = useGetShipmentTimeLine(shipmentId);
	
	const shipment_data={};
	let isCompleted = true;

	return (
		<div className={styles.Container} >
			<div className={styles.Wrapper}>
				{!loading ? timelineData?.map((item, i) => {
					if (!item?.completed_on) {
						isCompleted = false;
					}

					const isNextMain = !timelineData[i + 1]?.is_sub;

					return (
						 <TimeLineItem
							key={timelineData?.milestone}
							timeLine={timelineData}
							index={i}
							isCompleted={isCompleted}
							shipmentData={shipment_data}
							item={item}
							isNextMain={isNextMain}
							isLast={i === timelineData?.length - 1}
						/>  
					);
				}) : <div className={styles.loading}>
				<Placeholder height="30px" width="300px"/>
				<Placeholder height="30px" width="300px"/>
				<Placeholder height="30px" width="300px"/>
			     </div>
			}
			</div>
		</div>
	);
};

export default TimeLine;
