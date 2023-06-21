import SailingSchedulesManagement from "../SailingSchedulesManagement";

function SailingSchedules() {
    const [activeTab, setActiveTab] = useState("sailing_schedules");
    return (
        <>
            <SailingSchedulesManagement
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </>
    );
}

export default SailingSchedules;
