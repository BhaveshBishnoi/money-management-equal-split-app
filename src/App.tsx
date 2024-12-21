import { useState } from 'react';
import './App.css'; // Import the CSS file

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
    const totalSpent = members.reduce((acc, member) => acc + member.totalSpent, 0);
    const averageSpent = totalSpent / members.length;
    return members.map(member => ({
      name: member.name,
      balance: member.totalSpent - averageSpent
    }));
  };

  return (
    <div className="app-container">
      <h1>Money Management App</h1>
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter member name" 
          value={newMemberName} 
          onChange={(e) => setNewMemberName(e.target.value)} 
        />
        <button onClick={addMember}>Add Member</button>
      </div>
      <div className="input-section">
        <input 
          type="number" 
          placeholder="Enter expense amount" 
          value={newExpenseAmount} 
          onChange={(e) => setNewExpenseAmount(e.target.value ? parseFloat(e.target.value) : '')} 
        />
        <div>
          {members.map(member => (
            <label key={member.name}>
              <input 
                type="checkbox" 
                checked={selectedMembers.includes(member.name)} 
                onChange={() => {
                  setSelectedMembers(selectedMembers.includes(member.name)
                    ? selectedMembers.filter(name => name !== member.name)
                    : [...selectedMembers, member.name]);
                }} 
              />
              {member.name}
            </label>
          ))}
        </div>
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Balances</h2>
        {members.map(({ name, totalSpent }) => (
          <p key={name}>{name}: {totalSpent.toFixed(2)}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
