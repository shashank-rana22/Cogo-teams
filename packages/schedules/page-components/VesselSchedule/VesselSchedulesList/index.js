import Filter from "./Filter";
import VesselScheduleCard from "./VesselScheduleCard";
import useGetVesselSchedules from "./hooks/useGetVesselSchedules";

function  VesselSchedulesList(){
    
    const {data} = useGetVesselSchedules();
    console.log(data)
    return <>
        <Filter/>
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