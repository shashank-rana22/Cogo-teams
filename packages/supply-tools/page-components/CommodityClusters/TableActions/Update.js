import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import useUpdateFclFreightCommodityCluster from '../../../hooks/useUpdateFclFreightCommodityCluster';
import CommodityForm from '../CommodityForm';

function Update({ show = null, setShow = () => {}, item = {}, refetch = () => {} }) {
	const { apiTrigger, loading } = useUpdateFclFreightCommodityCluster({
		refetch: () => {
			refetch();
			setShow(null);
		},
	});

	const formRef = useRef(null);

	const handleSubmitForm = ({ data }) => {
		apiTrigger({ values: data, item });
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return !isEmpty(show) ? (
		<Modal show={!isEmpty(show)} onClose={() => setShow(null)} placement="top" size="lg">
			<Modal.Header title="UPDATE COMMOODITY CLUSTER" />

			<Modal.Body>
				<CommodityForm handleSubmitForm={handleSubmitForm} item={show} ref={formRef} />
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
					onClick={onSubmit}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	) : null;
}

export default Update;
