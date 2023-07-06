import { Button, Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function Item({ isSupplierPage = false }) {
	const { push } = useRouter();
	const navigate = () => {
		push(
			'/governance-manager/[id]',
			'/governance-manager/abcd',
		);
	};
	const goBack = () => {
		push(
			'/governance-manager/',
			'/governance-manager/',
		);
	};

	return (
		<div className={styles.item}>
			{ isSupplierPage && (
				<div>
					<Button themeType="secondary" onClick={() => goBack()}>
						Go Back
					</Button>
				</div>
			)}
			<div>
				<div className={styles.key}>Supplier Name</div>
				<div className={styles.value}>Dragon City Private Limited</div>
			</div>
			<div>
				<div className={styles.key}>Home Country</div>
				<div className={styles.value}>Australia</div>
			</div>
			<div>
				<div className={styles.key}>Service Provided</div>
				<div className={styles.value}>
					FCL | LCL | Trucking &nbsp;
					<span className={styles.more}>+1 more</span>
				</div>
			</div>

			{ !isSupplierPage && (
				<>
					<div>
						<div className={styles.key}>Analysis Status</div>
						<div className={styles.value}>
							<Pill
								size="md"
								color="blue"
							>
								2/4 Services Needed
							</Pill>

						</div>
					</div>
					<div>
						<Button themeType="accent" onClick={() => navigate()}>
							View
						</Button>
					</div>

				</>
			)}

		</div>
	);
}

export default Item;
