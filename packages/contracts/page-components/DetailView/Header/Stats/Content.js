import { Button } from '@cogoport/components';

import Line from '../../../../common/Line';
import Margin from '../../../../common/MiniCard/Margin';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';
import useGetContractStats from '../../../../hooks/useGetContractStats';
import useUpdateContract from '../../../../hooks/useUpdateContract';

import styles from './styles.module.css';

function Content({ data, status }) {
	const { updateContract } = useUpdateContract();

	const handleUpdateContract = async (val) => {
		await updateContract({
			payload: {
				id     : data?.id,
				status : val,
			},
		});
	};
	const { data: statsData } = useGetContractStats({ id: data?.id });

	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				<Percentage data={statsData?.project_consolidated_profitability} />
				<Line />
				<Price data={statsData?.project_consolidated_revenue} />
				<Line />
				<Margin />
			</div>
			{status === 'pending_approval' ? (
				<div className={styles.button_container}>
					<Button
						themeType="secondary"
						size="md"
						onClick={() => {
							handleUpdateContract('rejected');
						}}
					>
						Reject
					</Button>
					<Button
						themeType="primary"
						size="md"
						onClick={() => {
							handleUpdateContract('active');
						}}
					>
						Approve
					</Button>
				</div>
			) : null}
		</div>
	);
}
export default Content;
