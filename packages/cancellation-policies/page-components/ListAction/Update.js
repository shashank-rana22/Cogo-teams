import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import checkSatisfyingConditions from '../../helpers/checkSatisfyingConditions';
import useUpdateShipmentCancellation from '../../hooks/useUpdateShipmentCancellationCharges';
import CANCEL_REASON_MAPPING from '../../utils/cancellationReasonMapper';
import AddNewCancellationPolicyForm from '../Header/AddNewCancellationPolicyForm';

function Update({
	show = null, setShow = () => {},
	item = {},
	refetch = () => {},
}) {
	const { apiTrigger = () => {}, loading = false } = useUpdateShipmentCancellation({
		refetch: () => {
			refetch();
			setShow(false);
		},
	});

	const formRef = useRef(null);

	const handleSubmitForm = ({ data = {}, reset = () => {} }) => {
		const isSatifyingDaysLimit = checkSatisfyingConditions({ data });

		if (isSatifyingDaysLimit) {
			const { conditions, ...rest } = data || {};

			if (!isEmpty(conditions)) {
				rest.conditions = conditions?.map((obj) => ({
					[obj.attribute]: `${CANCEL_REASON_MAPPING[obj.condition]} ${
						obj.days
					}`,
				}));
			}
			apiTrigger({ ...rest, id: item?.id });

			reset();
		}
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return !isEmpty(show) ? (
		<Modal show={!isEmpty(show)} onClose={() => setShow(null)} placement="top" size="lg">
			<Modal.Header title="Edit Cancellation Charges" />

			<Modal.Body>
				<AddNewCancellationPolicyForm
					handleSubmitForm={handleSubmitForm}
					item={item}
					ref={formRef}
					isEdit
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
