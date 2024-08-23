import DashboardItem from "@/components/dashboard/dashboardItem";
import Welcome from "@/components/dashboard/welcome";
import "./dashboard/dashboard.css";

export default async function Home() {
  const dashboardItems = [
    { title: "To-Do List", icon: "/icons/todolist.png", link: "/todo" },
    { title: "Timetable", icon: "/icons/timetable.png", link: "/timetable" },
    {
      title: "GPA Calculator",
      icon: "/icons/calculator.png",
      link: "/calculator",
    },
  ];
  return (
    <main>
      <Welcome />
      <div className="dashboard">
        {dashboardItems.map((item, index) => (
          <DashboardItem
            key={index}
            title={item.title}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </div>
    </main>
  );
}
