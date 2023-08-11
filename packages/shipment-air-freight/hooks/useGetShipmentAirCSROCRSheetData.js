import { useRequest } from '@cogoport/request';

const useGetShipmentAirCSROCRSheetData = ({ setTerminalChargeState = () => {}, sheetData = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/get_shipment_air_csr_ocr_data',
		method       : 'GET',
		service_name : 'shipment',
		params       : {
			sheet_id    : sheetData?.id,
			sheet_index : 1,
		},
	}, { manual: true });

	const getCSROCRData = async () => {
		try {
			await trigger({
				sheet_id    : sheetData?.id,
				sheet_index : 1,
			});
		} catch (err) {
			console.error(err);
		} finally {
			setTerminalChargeState('data_fetched');
		}
	};
	return {
		getCSROCRData,
		loading,
		data,
	};
};
export default useGetShipmentAirCSROCRSheetData;
