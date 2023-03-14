import React from 'react';
import { Button, Skeleton } from '@cogoport/front/components/admin';
import Layout from '@cogo/business-modules/form/Layout';
import useCommodityUpdate from '../../../../../hooks/useCommodityUpdate';
import { Container, ButtonContainer } from './styles';

const FreightRate = ({
	task = {},
	loading = false,
	rate = {},
	containersData = [],
	commodityValues = {},
	shipmentData = {},
	setUpdateFreightCertificate = () => {},
	primary_service = {},
	refetch = () => {},
	onCancel = () => {},
	timeLineRefetch = () => {},
}) => {
	const {
		fields = [],
		error = {},
		onCreate = () => {},
		handleSubmit = () => {},
		onError = () => {},
		loadingRate = false,
		controls = [],
		customLabels,
	} = useCommodityUpdate({
		task,
		rate,
		containersData,
		commodityValues,
		shipmentData,
		setUpdateFreightCertificate,
		primary_service,
		refetch,
		onCancel,
		timeLineRefetch,
	});

	const handleCancel = () => {
		if (task.task) {
			onCancel();
		} else {
			setUpdateFreightCertificate(false);
		}
	};
	return (
		<Container>
			<Layout
				fields={fields}
				controls={controls}
				errors={error}
				customLabels={customLabels}
			/>

			{!loading ? (
				<ButtonContainer>
					<Button
						className="secondary md"
						style={{ marginRight: 10 }}
						onClick={handleCancel}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit(onCreate, onError)}
						disabled={loadingRate}
					>
						Update
					</Button>
				</ButtonContainer>
			) : (
				<Skeleton height="20px" width="100%" />
			)}
		</Container>
	);
};

export default FreightRate;
