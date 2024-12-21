import { useState } from 'react';

interface Member {
  name: string;
  totalSpent: number;
}

interface Expense {
  amount: number;
  members: string[];
  paidBy: string;
}

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number | ''>('');
  const [paidBy, setPaidBy] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const addMember = () => {
    if (newMemberName) {
      setMembers([...members, { name: newMemberName, totalSpent: 0 }]);
      setNewMemberName('');
    }
  };

  const addExpense = () => {
    if (newExpenseAmount && selectedMembers.length > 0 && paidBy) {
      const amount = Number(newExpenseAmount);
      const splitAmount = amount / selectedMembers.length;
      setExpenses([...expenses, { amount, members: selectedMembers, paidBy }]);
      setMembers(members.map(member => 
        selectedMembers.includes(member.name) 
          ? { ...member, totalSpent: member.totalSpent + splitAmount }
          : member
      ));
      setNewExpenseAmount('');
      setSelectedMembers([]);
      setPaidBy('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Money Management App</h1>
      <div className="mb-6 flex flex-col sm:flex-row items-center">
        <input 
          type="text" 
          placeholder="Enter member name" 
          value={newMemberName} 
          onChange={(e) => setNewMemberName(e.target.value)} 
          className="p-3 border border-gray-300 rounded-lg mb-2 sm:mb-0 sm:mr-2 w-full sm:w-3/4"
        />
        <button 
          onClick={addMember} 
          className="p-3 text-sm text-nowrap bg-black text-white rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Add Member
        </button>
      </div>
      <div className="mb-6 flex flex-col sm:flex-row items-center">
        <input 
          type="number" 
          placeholder="Enter expense amount" 
          value={newExpenseAmount} 
          onChange={(e) => setNewExpenseAmount(e.target.value ? parseFloat(e.target.value) : '')} 
          className="p-3 border border-gray-300 rounded-lg mb-2 sm:mb-0 sm:mr-2 w-full sm:w-3/4"
        />
        <select 
          value={paidBy} 
          onChange={(e) => setPaidBy(e.target.value)} 
          className="p-3 border border-gray-300 rounded-lg mb-2 sm:mb-0 sm:mr-2 w-full sm:w-3/4"
        >
          <option value="">Paid By</option>
          {members.map(member => (
            <option key={member.name} value={member.name}>{member.name}</option>
          ))}
        </select>
        <button 
          onClick={addExpense} 
          className="text-sm text-nowrap p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Add Expense
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Members to Split Expense</h2>
        <div className="p-3 mb-2 w-full">
          {members.map(member => (
            <div key={member.name} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={member.name}
                value={member.name}
                checked={selectedMembers.includes(member.name)}
                onChange={(e) => {
                  const selected = e.target.checked
                    ? [...selectedMembers, member.name]
                    : selectedMembers.filter(name => name !== member.name);
                  setSelectedMembers(selected);
                }}
                className="mr-2"
              />
              <label htmlFor={member.name} className="text-gray-700">{member.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Expenses</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Split Amount</th>
              <th className="border border-gray-300 p-2">Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => {
              const totalPaid = expenses.reduce((acc, expense) => 
                expense.paidBy === member.name ? acc + expense.amount : acc, 0);
              const totalSplit = expenses.reduce((acc, expense) => 
                expense.members.includes(member.name) ? acc + (expense.amount / expense.members.length) : acc, 0);

              return (
                <tr key={member.name}>
                  <td className="border border-gray-300 p-2">{member.name}</td>
                  <td className="border border-gray-300 p-2">{totalSplit.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{totalPaid.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="font-bold text-gray-800">
            Total Paid Amount: {expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}
          </p>
        </div>
      </div>
      <p className='text-center'>Made with ❤️ by <a href='https://instagram.com/bhavesh_bishnoi' target='_blank'>Bhavesh</a> </p>
    </div>

   
  );
}

export default App;
