import Filter from "./Filter";
import VesselScheduleCard from "./VesselScheduleCard";
import useGetVesselSchedules from "./hooks/useGetVesselSchedules";
import {useState} from 'react'

function  VesselSchedulesList(){
    
    const [filter,setFilter] = useState({})
    const {data} = useGetVesselSchedules({filter});
    console.log(filter)
    return <>
        <Filter filter={filter} setFilter={setFilter}/>
        {
            data && data?.map((vessel)=>(
                <>
                <VesselScheduleCard vessel={vessel}/>
                </>
            ))

        }
    </>    
}
export default VesselSchedulesList;