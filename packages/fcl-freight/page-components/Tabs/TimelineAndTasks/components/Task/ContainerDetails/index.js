import { useSelector } from '@cogo/store';
import { useFormCogo } from '@cogoport/front/hooks';
import Layout from '@cogo/business-modules/form/Layout';
import { useRequest } from '@cogo/commons/hooks';
import { toast, Button } from '@cogoport/front/components/admin';
import controls from './Controls';
import styles from './styles.module.css';

const ContainerDetails = ({ setShow }) => {
	const scope = useSelector(({ general }) => general?.scope);

	const { fields, watch } = useFormCogo(controls);
	const formValues = watch();

	const addContainerDetails = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_container_exception');

	const handleClick = async () => {
		const payload = {
			container_numbers: (formValues?.container_number || []).map(
				(num) => num.container_number,
			),
		};
		const response = await addContainerDetails?.trigger({
			data: payload,
		});

		if (!response?.hasError) {
			toast?.success('Container Number added Successfully!');
			setShow(false);
		}
	};

	return (
		<div>
			<div className={styles.heading}>ADD CONTAINER NUMBER</div>

			<Layout controls={controls} fields={fields} errors={{}} />

			<div className={styles.button_wrap}>
				<Button className="secondary md" onClick={() => setShow(false)}>
					cancel
				</Button>

				<Button onClick={handleClick}>Submit</Button>
			</div>
		</div>
	);
};

export default ContainerDetails;
