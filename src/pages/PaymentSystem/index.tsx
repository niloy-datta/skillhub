import { useState } from 'react';

export function PaymentSystem() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  
  const transactions = [
    { id: 1, type: 'received', amount: 450, from: 'TechCorp Inc.', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'sent', amount: 120, to: 'Freelancer Pro', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'received', amount: 680, from: 'StartupXYZ', date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'sent', amount: 95, to: 'Design Expert', date: '2024-01-12', status: 'pending' },
    { id: 5, type: 'received', amount: 520, from: 'WebAgency', date: '2024-01-11', status: 'completed' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'Pay with PayPal account' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', desc: 'Direct bank transfer' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', desc: 'Bitcoin, Ethereum' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Payment <span className="gradient-text">System</span>
          </h1>
          <p className="text-xl text-gray-600">Manage your payments and transactions</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-white/80 mb-2">Available Balance</p>
              <p className="text-6xl font-black">$5,470.00</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 mb-2">Pending</p>
              <p className="text-3xl font-bold">$95.00</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn-shine flex-1 px-6 py-3 rounded-2xl bg-white text-indigo-600 font-bold shadow-xl hover:shadow-2xl transition-all">
              Withdraw
            </button>
            <button className="flex-1 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold hover:bg-white/30 transition-all">
              Add Funds
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl">{method.icon}</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.desc}</p>
                    </div>
                    {selectedMethod === method.id && (
                      <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
                      transaction.type === 'received' 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-red-500 to-pink-600'
                    }`}>
                      {transaction.type === 'received' ? '↓' : '↑'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {transaction.type === 'received' ? transaction.from : transaction.to}
                      </h3>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-black ${
                        transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'received' ? '+' : '-'}${transaction.amount}
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Received', value: '$12,450', icon: '💰', color: 'from-green-500 to-emerald-600' },
            { label: 'Total Sent', value: '$3,420', icon: '💸', color: 'from-red-500 to-pink-600' },
            { label: 'Pending', value: '$95', icon: '⏳', color: 'from-yellow-500 to-orange-600' },
            { label: 'Transactions', value: '47', icon: '📊', color: 'from-purple-500 to-pink-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
