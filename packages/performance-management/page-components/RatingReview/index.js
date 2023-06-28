import { Button, Select } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useGetEmployeeLevels from './hooks/useGetEmployeeLevels';
import useGetRatingReviewDetails from './hooks/useGetRatingReviewDetails';
import KraModal from './KraModal';
import RenderVerticalHeadComponent from './RenderVerticalHeadComponent';
import styles from './styles.module.css';

function PerformanceRatingReview() {
	const {
		selectOptions,
		selectValue,
		setSelectValue,
		selectedEmployees,
		setSelectedEmployees,
		show,
		setShow,
		level,
	} = useGetEmployeeLevels();

	const { data } = useGetRatingReviewDetails({ selectValue, level });

	const router = useRouter();

	const onClickEmployee = (id) => {
		setShow(id);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.back_arrow}>
					<IcMArrowBack width={22} height={22} style={{ marginRight: 2 }} onClick={() => router.back()} />
				</div>

				<div className={styles.header}>
					Performance Rating Review
				</div>
			</div>

			<div className={styles.select_row}>
				<div className={styles.select_container}>
					<Select
						value={selectValue}
						onChange={setSelectValue}
						options={selectOptions}
					/>
				</div>

				<Button disabled={isEmpty(selectedEmployees)}>
					Publish
				</Button>

			</div>

			<RenderVerticalHeadComponent
				list={data}
				setSelectedEmployees={setSelectedEmployees}
				selectedEmployees={selectedEmployees}
				level={level}
				onClickEmployee={onClickEmployee}
				setShow={setShow}
			/>

			{show ? <KraModal show={show} setShow={setShow} /> : null}
		</div>
	);
}

export default PerformanceRatingReview;
