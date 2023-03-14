import React, { useEffect, useContext } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import useGetContainerDetails from '../../../../hooks/useGetContainerDetails';
import tableColumn from './tableColumn';
import FreightRate from './FreightRate';
import formatDataForTable from './helpers/formatDataForTable';
import { ShipmentDetailContext } from '../../../../../commons/Context';
import { Container, Title, StyledTable, RateContainer } from './styles';

const UpdateFreightCertificate = ({
	task = {},
	refetch,
	onCancel,
	timeLineRefetch,
	setUpdateFreightCertificate = () => {},
}) => {
	const [{ shipment_data, primary_service }] = useContext(
		ShipmentDetailContext,
	);

	const services = shipment_data?.all_services || [];
	const { loading, rate, data } = useGetContainerDetails({
		services,
	});

	const { containersData, controls } = formatDataForTable({ services, data });

	const { fields, setValue, watch } = useFormCogo(controls || []);
	const formValue = watch();

	useEffect(() => {
		if (
			shipment_data?.shipment_type === 'fcl_freight' &&
			fields &&
			containersData
		) {
			(containersData || [])?.forEach((ele, index) => {
				setValue(
					`is_hazardous-${index + 1}`,
					containersData?.[index]?.is_hazardous
						? `hazardous-${ele?.container_size}-${ele?.container_type}`
						: `non_hazardous-${ele?.container_size}-${ele?.container_type}`,
				);
			});
		}
	}, [JSON.stringify(data || {})]);

	return (
		<Container>
			{shipment_data?.shipment_type === 'fcl_freight' ? (
				<>
					<Title>Container Details</Title>
					<StyledTable
						data={containersData || []}
						columns={tableColumn({ fields })}
						loading={loading}
					/>
				</>
			) : null}
			<RateContainer>
				<Title>Freight Declaration Section</Title>

				<FreightRate
					task={task}
					rate={rate}
					loading={loading}
					containersData={containersData}
					commodityValues={formValue}
					shipmentData={shipment_data}
					setUpdateFreightCertificate={setUpdateFreightCertificate}
					primary_service={primary_service}
					refetch={refetch}
					onCancel={onCancel}
					timeLineRefetch={timeLineRefetch}
				/>
			</RateContainer>
		</Container>
	);
};

export default UpdateFreightCertificate;
