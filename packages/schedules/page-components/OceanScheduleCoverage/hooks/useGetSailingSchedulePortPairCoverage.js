import { useRequest } from "@cogoport/request";
import { useSelector } from "@cogoport/store";
import {useEffect} from 'react'


const useGetSailingSchedulePortPairCoverage = ({originPort,destinationPort})=>{
    const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
    const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : `get_sailing_schedule_port_pair_coverages`,
        scope,
	}, { manual: true });

    const getSailingSchedulePortPairCoverageData = () => {
        return trigger({
            params: {
                origin_port_id:originPort,
                destination_port_id:destinationPort,
                page : 1
            }
        })
    }

    useEffect(  ()=>{        
        getSailingSchedulePortPairCoverageData();
    },[])

    return {
        data:data?.coverages,
        getSailingSchedulePortPairCoverageData,
        totalCount:data?.total_count
        };

}
export default useGetSailingSchedulePortPairCoverage;