export default function StatCard({ title, value, change, positive, icon: Icon, iconBg }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <span className={`p-2 rounded-lg ${iconBg}`}>
          <Icon className="w-5 h-5 text-white" />
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className={`text-sm font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
        <span className="text-gray-500 dark:text-gray-400 font-normal"> vs last month</span>
      </div>
    </div>
  )
}
