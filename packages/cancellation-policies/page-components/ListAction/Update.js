import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import AddNewCancellationPolicyForm from '../Header/AddNewCancellationPolicyForm';

// import useUpdateFclFreightCommodityCluster from '../../../hooks/useUpdateFclFreightCommodityCluster';

function Update({
	show = null, setShow = () => {},
// item = {},
// refetch = () => {}
}) {
	// const { apiTrigger, loading } = useUpdateFclFreightCommodityCluster({
	// 	refetch: () => {
	// 		refetch();
	// 		setShow(null);
	// 	},
	// });

	const formRef = useRef(null);
	// console.log(item, refetch, 'hi');
	// const handleSubmitForm = ({ data }) => {
	// 	apiTrigger({ values: data, item });
	// };

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return !isEmpty(show) ? (
		<Modal show={!isEmpty(show)} onClose={() => setShow(null)} placement="top" size="lg">
			<Modal.Header title="UPDATE COMMOODITY CLUSTER" />

			<Modal.Body>
				<AddNewCancellationPolicyForm
				// handleSubmitForm={handleSubmitForm}
					item={show}
					ref={formRef}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					style={{ marginRight: 8 }}
					// disabled={loading}
					onClick={() => setShow(false)}
				>
					Cancel
				</Button>

				<Button
					// disabled={loading}
					onClick={onSubmit}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default Update;
