import axios from 'axios'
import {useState,useEffect} from 'react'

const useGetVesselSchedules = ({filter}) =>{
    const [data,setData] = useState(null)
    const makeRequest = async () =>{
        const params ={
            filter,
            page_limit:10,
            page:1,
            pagination_data_required:true,
            sort_by:'updated_at',
            sort_type:'desc'
            
        }
        const res = axios.get('http://192.168.195.35:8000/location/list_vessel_schedules',{params})
        return res;
    }

    useEffect(()=>{
        makeRequest().then((res)=>{
            setData(res);
        })
    },[])
    return {
        data:data?.data?.list
    }

}
export default useGetVesselSchedules;