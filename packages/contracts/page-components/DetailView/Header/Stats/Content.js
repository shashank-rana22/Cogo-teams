import { Button } from '@cogoport/components';

import Line from '../../../../common/Line';
import Margin from '../../../../common/MiniCard/Margin';
import Percentage from '../../../../common/MiniCard/Percentage';
import Price from '../../../../common/MiniCard/Price';
import useUpdateContract from '../../../../hooks/useUpdateContract';

import styles from './styles.module.css';

function Content({ data }) {
	const { updateContract } = useUpdateContract();

	const handleUpdateContract = async (val) => {
		await updateContract({
			payload: {
				id     : data?.id,
				status : val,
			},
		});
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.information}>
				<Percentage />
				<Line />
				<Price />
				<Line />
				<Margin />
			</div>
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
						handleUpdateContract('approved');
					}}
				>
					Approve
				</Button>
			</div>
		</div>
	);
}
export default Content;
