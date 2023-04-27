import { Modal, Button, Placeholder } from '@cogoport/components';
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
}:Props) {
	const { totalRecords } = data || {};
	const { push } = useRouter();
	const { getCreateNewPayRun } = useGetCreateNewPayRun({ activeEntity, currency });
	const handleClick = async () => {
		const resp: CreateNewPayRunResponse = await getCreateNewPayRun();
		push(`/business-finance/account-payables/advance-payment/create-new-payrun?payrun=${resp?.data?.id}
		&currency=${currency}&entity=${activeEntity}`);
	};
	const [exitPayRun, setExitPayRun] = useState(false);
	return (
		<div className={styles.container}>
			<Modal size="md" show={payRunType} onClose={() => setPayRunType(false)} placement="top">

				<Modal.Body>
					{ loading ? <Placeholder className={styles.loader} />
						: (
							<div className={styles.sub_container}>
								{totalRecords}
								{' '}
								{totalRecords > 0
									? (`Pay Runs Available with same entity & currency. 
							You can either create a new payrun or add more invoices into existing one`)
									: 'Pay Run Available, Please Create a new Payrun'}
							</div>
						)}
				</Modal.Body>
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
				/>
			)}
		</div>
	);
}

export default PayRunTypeModal;
