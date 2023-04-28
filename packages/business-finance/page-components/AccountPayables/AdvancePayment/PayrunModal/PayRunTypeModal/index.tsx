import { Modal, Button, Toast, Placeholder } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetCreateNewPayRun from '../../hooks/useGetCreateNewPayRun';

import ExitingPayRun from './ExistingPayRun';
import styles from './styles.module.css';

interface CreateNewPayRunResponse {
	data?: {
		id: string;
	};
}

interface DataTypes {
	list: object[];
	pageIndex?: number;
	totalPage?: number;
	totalRecords?: number;

}
interface FiltersProps {
	pageIndex:number,
}
interface Props {
	payRunType:boolean,
	setPayRunType:Function,
	data:DataTypes,
	loading:boolean,
	filters:FiltersProps,
	setFilters:Function,
	activeEntity:string,
	currency:string,
	setShow:Function,
}

function PayRunTypeModal({
	payRunType,
	setPayRunType,
	data,
	loading,
	filters,
	setFilters,
	activeEntity,
	currency,
	setShow,
}:Props) {
	const { totalRecords } = data || {};
	const { push } = useRouter();
	const { getCreateNewPayRun } = useGetCreateNewPayRun({ activeEntity, currency });
	const handleClick = async () => {
		const resp: CreateNewPayRunResponse = await getCreateNewPayRun();
		push(`/business-finance/account-payables/advance-payment/create-new-payrun?payrun=${resp?.data?.id}
		&currency=${currency}&entity=${activeEntity}`);

		setPayRunType(false);
		setShow(false);
		Toast.success('PayRun Initialised, Please wait...');
	};
	const [exitPayRun, setExitPayRun] = useState(false);
	return (
		<div className={styles.container}>
			<Modal size="md" show={payRunType} onClose={() => setPayRunType(false)} placement="top">

				<div className={styles.body}>
					{ loading ? <Placeholder className={styles.loader} />
						: (
							<div className={styles.sub_container}>

								{totalRecords > 0
									?									(
										<div>
											<div className={styles.header}>
												{totalRecords}
												{' '}
												{' '}
												Pay Runs Available with same entity & currency
											</div>
											<div className={styles.sub_header}>
												You can either create a new payrun
												or add more invoices into existing one
											</div>
										</div>
									)
									:									(
										<div>
											{totalRecords}
											{' '}
											{' '}
											Pay Run Available, Please Create a new Payrun
										</div>
									)}

							</div>
						)}
				</div>

				<Modal.Footer>
					<Button
						disabled={loading || totalRecords < 1}
						onClick={() => setExitPayRun(true)}
						themeType="secondary"
					>
						Add Into Existing Pay Run
					</Button>
					<div className={styles.button}>
						<Button
							disabled={loading}
							themeType="secondary"
							onClick={handleClick}
						>
							Create New Pay Run

						</Button>
					</div>
				</Modal.Footer>
			</Modal>
			{exitPayRun && (
				<ExitingPayRun
					exitPayRun={exitPayRun}
					setExitPayRun={setExitPayRun}
					data={data}
					loading={loading}
					filters={filters}
					setFilters={setFilters}
					currency={currency}
					activeEntity={activeEntity}
					setShow={setShow}
				/>
			)}
		</div>
	);
}

export default PayRunTypeModal;
