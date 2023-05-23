import dummyData from '../DummyData/get_service_timeline.json'

export default function useGetServiceTimeline(){
    const loading = false;
    const getShipmentTimeline = () => {}
    
    return {
		timelineLoading : loading,
		timelineData    : dummyData || [],
		getShipmentTimeline,
	};
}