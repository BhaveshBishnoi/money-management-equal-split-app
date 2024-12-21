import { useState } from 'react';

interface Member {
  name: string;
  totalSpent: number;
}

interface Expense {
  amount: number;
  members: string[];
}

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number | ''>('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const addMember = () => {
    if (newMemberName) {
      setMembers([...members, { name: newMemberName, totalSpent: 0 }]);
      setNewMemberName('');
    }
  };

  const addExpense = () => {
    if (newExpenseAmount && selectedMembers.length > 0) {
      const amount = Number(newExpenseAmount);
      const splitAmount = amount / selectedMembers.length;
      setExpenses([...expenses, { amount, members: selectedMembers }]);
      setMembers(members.map(member => 
        selectedMembers.includes(member.name) 
          ? { ...member, totalSpent: member.totalSpent + splitAmount }
          : member
      ));
      setNewExpenseAmount('');
      setSelectedMembers([]);
    }
  };

  const equalizeExpenses = () => {
    const balances = members.map(member => ({
      name: member.name,
      balance: member.totalSpent,
    }));
    return balances;
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
        <button 
          onClick={addExpense} 
          className="text-sm text-nowrap p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Add Expense
        </button>
      </div>
      <div className="mb-4">
        {members.map(member => (
          <label key={member.name} className="block">
            <input 
              type="checkbox" 
              checked={selectedMembers.includes(member.name)} 
              onChange={() => {
                setSelectedMembers(selectedMembers.includes(member.name)
                  ? selectedMembers.filter(name => name !== member.name)
                  : [...selectedMembers, member.name]);
              }} 
              className="mr-2"
            />
            {member.name}
          </label>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Balances</h2>
        {equalizeExpenses().map(({ name, balance }) => (
          <p key={name} className="text-gray-600">
            {name}: {balance.toFixed(2)}
          </p>
        ))}
        <p className="font-bold text-gray-800 mt-4">
          Total Spend of all Members: {members.reduce((acc, member) => acc + member.totalSpent, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default App;
