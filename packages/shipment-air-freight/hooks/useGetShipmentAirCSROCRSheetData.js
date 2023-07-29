import { useRequest } from '@cogoport/request';
const useGetShipmentAirCSROCRSheetData=({setTerminalChargeState=()=>{},sheetData={}})=>{

	const [{ loading }, trigger] = useRequest({
		url          : '/get_shipment_air_csr_ocr_data',
		method       : 'GET',
		service_name : 'shipment',
		params:{
			sheet_id:sheetData?.id,
			sheet_index:1,
		}
	}, { manual: true });

	const getCSROCRData = async () => {
		try {
			await trigger({	
				sheet_id:sheetData?.id,
				sheet_index:1,
			});
			setTerminalChargeState('data_fetched');
		} catch (err) {
			console.error(err);
		}
	
	};
    return {
		getCSROCRData,
		loading,
	};
}
export default useGetShipmentAirCSROCRSheetData;