// src/components/Admin/CreateAdminPopup.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import './CreateAdminPopup.css'; // style separately
import { assets } from '../../assets/assets';
import axios from 'axios';

type Props = {
  onClose: () => void;
};

const CreateAdminPopup: React.FC<Props> = ({ onClose }) => {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/user/register', data);
      alert(res.data.message || 'Admin created successfully');
      onClose(); // close the popup after success
    } catch (err) {
      console.error(err);
      alert('Error creating admin');
    }
  };

  return (
    <div className="create-admin-popup">
      <form className="create-admin-container" onSubmit={handleSubmit}>
        <div className="popup-header">
          <h2>Create New Admin</h2>
          <img src={assets.cross_icon} onClick={onClose} alt="Close" />
        </div>
        <div className='admin-popup-inputs'>
        <input name="name" onChange={handleChange} value={data.name} type="text" placeholder="Name" required />
        <input name="email" onChange={handleChange} value={data.email} type="email" placeholder="Email" required />
        <input name="password" onChange={handleChange} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default CreateAdminPopup;
