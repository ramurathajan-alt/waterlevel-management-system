import './AdminHeader.css';

type AdminHeaderProps = {
  isLoading: boolean;
  onRefresh: () => void;
  onCreateAdmin: () => void;
};

const AdminHeader = ({ isLoading, onRefresh, onCreateAdmin }: AdminHeaderProps) => {
  return (
    <header className='dashboard-header'>
        <div>
             <h1 className='dashboard-title'>Water Level Management System</h1>
            <p className='dashboard-subtitle'>Admin Dashboard</p>
        </div>
      <div className='dashboard-nav'>
        <button className='refresh-button' onClick={onRefresh} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
        <button className='create-admin-button' onClick={onCreateAdmin}>
          Create New Admin
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
