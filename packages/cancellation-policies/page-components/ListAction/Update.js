import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import checkSatisfyingConditions from '../../helpers/checkSatisfyingConditions';
import useUpdateShipmentCancellation from '../../hooks/useUpdateShipmentCancellationCharges';
import CANCELREASONMAPPING from '../../utils/cancellationReasonMapper';
import AddNewCancellationPolicyForm from '../Header/AddNewCancellationPolicyForm';
// import useUpdateFclFreightCommodityCluster from '../../../hooks/useUpdateFclFreightCommodityCluster';
const TRUE = true;
function Update({
	show = null, setShow = () => {},
	item = {},
	refetch = () => {},
}) {
	const { apiTrigger, loading } = useUpdateShipmentCancellation({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const formRef = useRef(null);

	const handleSubmitForm = ({ data, reset }) => {
		const isSatifyingDaysLimit = checkSatisfyingConditions({ data });

		if (isSatifyingDaysLimit) {
			const { conditions, ...rest } = data;

			if (!isEmpty(conditions)) {
				rest.conditions = conditions.map((obj) => ({
					[obj.attribute]: `${CANCELREASONMAPPING[obj.condition]} ${
						obj.days
					}`,
				}));
				apiTrigger({ ...rest, id: item?.id });
			} else {
				apiTrigger({ ...data, id: item?.id });
			}
			reset();
		}
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return !isEmpty(show) ? (
		<Modal show={!isEmpty(show)} onClose={() => setShow(null)} placement="top" size="lg">
			<Modal.Header title="UPDATE COMMOODITY CLUSTER" />

			<Modal.Body>
				<AddNewCancellationPolicyForm
					handleSubmitForm={handleSubmitForm}
					item={item}
					ref={formRef}
					isEdit={TRUE}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary"
					style={{ marginRight: 8 }}
					disabled={loading}
					onClick={() => setShow(null)}
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
