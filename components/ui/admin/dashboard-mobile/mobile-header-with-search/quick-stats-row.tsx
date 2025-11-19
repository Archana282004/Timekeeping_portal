import QuickStatsRowCard from "./quick-stats-row-card";

const QuickStatsRow = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <QuickStatsRowCard
        count={45}
        description="Employees"
      />
      <QuickStatsRowCard
        count={12}
        description="Pending"
      />
      <QuickStatsRowCard
        count={3}
        description="Issues"
      />
      <QuickStatsRowCard
        count={28}
        description="Approved"
      />
    </div>
  )
}

export default QuickStatsRow;