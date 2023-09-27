import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useUpdateFclFreightRateExtensions from '../../../../hooks/useUpdateFclFreightRateExtensions';

function Delete({
	show = null, setShow = () => {}, item = {},
	refetch = () => {},
}) {
	const { apiTrigger, loading } = useUpdateFclFreightRateExtensions({
		successMessage : 'Deleted Successfully',
		refetch        : () => {
			refetch();
			setShow(null);
		},
	});

	const onDelete = () => {
		apiTrigger({ item, status: 'inactive' });
	};

	return !isEmpty(show) ? (
		<Modal show={!isEmpty(show)} onClose={() => setShow(null)} placement="top">
			<Modal.Header title="DELETE FCL FREIGHT RATE EXTENSION" />

			<Modal.Body>
				<div>
					Do you want to delete this Extension :
					{' '}
					<span style={{ fontWeight: 'bold' }}>{item?.name}</span>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					style={{ marginRight: 8 }}
					disabled={loading}
					onClick={() => setShow(false)}
				>
					Cancel
				</Button>

				<Button
					disabled={loading}
					onClick={onDelete}
				>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default Delete;
