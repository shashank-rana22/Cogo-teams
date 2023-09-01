import { Button, Modal } from '@cogoport/components';
import { useState, useRef } from 'react';

import useCreateFclFreightCommodityCluster from '../../../hooks/useCreateFclFreightCommodityCluster';
import CommodityForm from '../CommodityForm';

function CreateCommodity({ refetch = () => {} }) {
	const [show, setShow] = useState(false);

	const formRef = useRef(null);

	const { apiTrigger = () => {}, loading } = useCreateFclFreightCommodityCluster({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const handleSubmitForm = ({ data }) => {
		apiTrigger({ values: data });
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return (
		<div>
			<Button onClick={() => setShow(true)}>CREATE NEW COMMODITY CLUSTER</Button>

			{show ? (
				<Modal onClose={() => setShow(false)} show={show} placement="top" size="lg">
					<Modal.Header title="ADD COMMODITY CLUSTER" />
					<Modal.Body>
						<CommodityForm handleSubmitForm={handleSubmitForm} ref={formRef} />
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
							onClick={onSubmit}
							disabled={loading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default CreateCommodity;
