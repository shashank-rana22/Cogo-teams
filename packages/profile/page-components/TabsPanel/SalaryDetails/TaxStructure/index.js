import { Modal, Button, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';
import useGetSalaryStructure from './useGetSalaryStructure';

function TaxStructure({ taxShow, setTaxShow, employee_id }) {
	const { data :dataArr, loading } = useGetSalaryStructure(employee_id);
	const list = Object.keys(dataArr?.salary_structure || {}).map((key) => ({
		key,
		value: dataArr?.salary_structure?.[key],
	}));
	return (
		<Modal size="lg" show={taxShow} onClose={() => setTaxShow(false)} placement="center">
			<Modal.Header title="Salary Structure Details" />
			<Modal.Body>
				{loading
					? <Loader />
					:				 (
						<div className={styles.container}>
							<div className={styles.salary_heading}>
								<span className={styles.heading_one}>salary component</span>
								<span className={styles.heading_two}>Annual salary</span>
								<span className={styles.heading_three}>monthly</span>
							</div>
							{(list || []).map((item) => (
								<div
									className={item.value?.is_group === false
										? styles.salary_content : styles.grp_salary_content}
									key={item.key}
									style={{ backgroundColor: `${item.value?.color}` }}
								>
									<span className={styles.content_one}>{item.value?.heading}</span>
									<span className={styles.content_two}>
										{Math.max(
											GLOBAL_CONSTANTS.zeroth_index,
											item.value?.yearlyValue,
										)}

									</span>
									<span className={styles.content_three}>
										{Math.max(
											GLOBAL_CONSTANTS.zeroth_index,
											item.value?.monthlyValue,
										)}

									</span>
								</div>
							))}
						</div>
					) }

			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => setTaxShow(false)}>OK</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default TaxStructure;
