import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { useEffect, useState } from 'react';

const useGetOrganizationVerify = ({ setOrgData = () => {} }) => {
	const [inputSerialId, setInputSerialId] = useState('');
	const [inputName, setInputName] = useState('');
	const { scope = '' } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));
	const getOrganizationApi = useRequest(
		'get',
		false,
		scope,
	)('/list_organization_trade_party_details');

	useEffect(() => {
		(async () => {
			if (inputName) {
				try {
					const response = await getOrganizationApi.trigger({
						params: {
							filters: {
								q: inputName,
							},
						},
					});
					if (!response?.hasError) {
						setOrgData(response?.data?.list || []);
					}
				} catch (error) {
					toast.error(error.meesage || 'No organization found');
				}
			}
		})();
	}, [inputName]);

	const refetch = async () => {
		try {
			const response = await getOrganizationApi.trigger({
				params: {
					filters: {
						serial_id: inputSerialId,
					},
				},
			});
			if (response?.data.list?.length === 0) {
				toast.error('No organization found with this Serial Id');
			}
			if (!response?.hasError) {
				setOrgData(response?.data?.list[0]);
			}
		} catch (error) {
			toast.error(error.meesage || 'No organization found');
		}
	};

	const handleKeyDown = (k) => {
		if (k?.key === 'Enter') {
			refetch();
		}
	};

	return {
		handleKeyDown,
		scope,
		inputSerialId,
		setInputSerialId,
		inputName,
		setInputName,
	};
};
export default useGetOrganizationVerify;
