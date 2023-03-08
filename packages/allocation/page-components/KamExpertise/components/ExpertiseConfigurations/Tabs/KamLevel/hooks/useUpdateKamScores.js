import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdateKamScores() {
    const formProps=useForm();
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'allocation/allocation_bulk_kam_expertise_configuration',
		authkey : 'allocation_bulk_kam_expertise_configuration',
	});

    const onSave = async (payload_data={})=>{
        try{
            const payload = 
        }
    }
}
