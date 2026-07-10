import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import { HiShoppingCart, HiUsers, HiCurrencyDollar, HiTrendingUp } from 'react-icons/hi'
import StatCard from '../components/StatCard'
import { supabase } from '../lib/supabase'

const revenueData = [
  { month: 'Jan', revenue: 6500, expenses: 3200 },
  { month: 'Feb', revenue: 5800, expenses: 2900 },
  { month: 'Mar', revenue: 8000, expenses: 4100 },
  { month: 'Apr', revenue: 7200, expenses: 3700 },
  { month: 'May', revenue: 9400, expenses: 4600 },
  { month: 'Jun', revenue: 8700, expenses: 4200 },
  { month: 'Jul', revenue: 11200, expenses: 5300 },
]

const trafficData = [
  { day: 'Mon', visitors: 420 },
  { day: 'Tue', visitors: 380 },
  { day: 'Wed', visitors: 510 },
  { day: 'Thu', visitors: 460 },
  { day: 'Fri', visitors: 620 },
  { day: 'Sat', visitors: 310 },
  { day: 'Sun', visitors: 275 },
]

const statusColors = {
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

const stats = [
  { title: 'Total Sales', value: '$42,500', change: '+12.5%', positive: true, icon: HiShoppingCart, iconBg: 'bg-blue-500' },
  { title: 'New Users', value: '3,842', change: '+8.2%', positive: true, icon: HiUsers, iconBg: 'bg-green-500' },
  { title: 'Revenue', value: '$68,340', change: '+4.1%', positive: true, icon: HiCurrencyDollar, iconBg: 'bg-purple-500' },
  { title: 'Growth Rate', value: '24.3%', change: '-1.8%', positive: false, icon: HiTrendingUp, iconBg: 'bg-orange-500' },
]

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setTransactions(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4 md:p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#8b5cf6" fill="url(#colorExpenses)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Visitors</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trafficData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading transactions...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">{error}</div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">No transactions found.</div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Transaction ID</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tx.id}</td>
                    <td className="px-6 py-4">{tx.name}</td>
                    <td className="px-6 py-4">{tx.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tx.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[tx.status] ?? 'bg-gray-100 text-gray-800'}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
