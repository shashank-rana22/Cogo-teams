import { useRequest } from '@cogoport/request';
import { Toast } from '@cogoport/components';


const useCreateShipmentTerminalService = ({
	shipment_id = '',
	setTerminalChargeModal = () => {},
}) => {


	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_terminal_service_task',
		method : 'POST',
    }, { manual: true });

	

	const createShipmentTerminalService = async () => {
		try {
			await trigger({
				data: {
					shipment_id,
				},
			});
			Toast.success('Terminal Charges Will Be Applied');
			setTerminalChargeModal(false);
		} catch (err) {
			console.error(err);
		}
	};

	return {
		createShipmentTerminalService,
		loading,
	};
};

export default useCreateShipmentTerminalService;