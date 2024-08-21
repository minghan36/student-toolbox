import './styles/dashboardItem.css';

export default function DashboardItem({ title, icon, link }) {
  return (
    <div className="dashboard-item-container">
      <p className="dashboard-item-title">{title}</p>
      <a href={link} className="dashboard-item">
        <img src={icon} alt={`${title} icon`} className="icon" />
      </a>
    </div>
  );
}

