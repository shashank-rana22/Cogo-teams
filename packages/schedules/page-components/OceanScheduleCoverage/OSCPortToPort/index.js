import { Button, Table } from '@cogoport/components';
import {getColumns} from '../helpers/column'
import styles from '../styles.module.css'
import useGetSailingSchedulePortPairCoverage from '../hooks/useGetSailingSchedulePortPairCoverage';
import ViewScheduleModal from '../ViewScheduleModal';
import { IcMArrowBack } from '@cogoport/icons-react';

const OSCPortToPort = ( {originPort,destinationPort,setIsPortToPort,columnsForPattern,columnsForPortToPort,show,setShow}) => {
	const {data,coverageTotalCount} = useGetSailingSchedulePortPairCoverage({originPort,destinationPort});
    return (
        <>
            <ViewScheduleModal show={show} setShow={setShow} columnsForPattern={columnsForPattern}/>
			<Button themeType="secondary" onClick={()=>setIsPortToPort(false)}><IcMArrowBack/></Button>
            {columnsForPortToPort && data && <Table columns={columnsForPortToPort} data={data} className={styles.table}/>} 
        </>

    );
}
export default OSCPortToPort;