import React, { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const projects = [
  { name: "Website Redesign", manager: "Sarah Johnson", due: "May 18, 2024", progress: 75, color: "violet", status: "In progress" },
  { name: "Mobile App Development", manager: "Michael Brown", due: "May 22, 2024", progress: 58, color: "blue", status: "In progress" },
  { name: "Marketing Campaign", manager: "Emily Davis", due: "May 25, 2024", progress: 40, color: "orange", status: "At risk" },
  { name: "Internal Dashboard", manager: "David Wilson", due: "May 30, 2024", progress: 90, color: "green", status: "On track" },
];

const activityItems = [
  { initials: "SJ", color: "avatar-purple", text: "Sarah Johnson completed the task", detail: '"Homepage wireframes"', time: "12 min ago" },
  { initials: "MB", color: "avatar-blue", text: "Michael Brown assigned a new task", detail: '"API integration"', time: "1 hour ago" },
  { initials: "ED", color: "avatar-orange", text: "Emily Davis commented on", detail: '"Marketing Campaign"', time: "3 hours ago" },
];

const deadlines = [
  { title: "Design System", project: "Website Redesign", date: "May 18", color: "violet" },
  { title: "Marketing Campaign", project: "Q2 Growth", date: "May 21", color: "orange" },
  { title: "Mobile App Development", project: "Product", date: "May 25", color: "blue" },
];

const primaryNavigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Tasks", icon: ListTodo },
  { label: "Calendar", icon: CalendarDays },
];

const secondaryNavigation = [
  { label: "Notifications", icon: Bell, count: "3" },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
];

function Avatar({ initials, color = "avatar-purple", small = false }) {
  return <span className={`avatar ${color}${small ? " avatar-small" : ""}`}>{initials}</span>;
}

function SectionHeading({ title, action }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action}
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [apiStatus, setApiStatus] = useState({ state: "checking", message: "" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API health check failed (${response.status})`);
        }
        return response.json();
      })
      .then((health) => {
        setApiStatus({
          state: health.database === "connected" ? "connected" : "database",
          message: health.database === "connected" ? "API and database connected" : "API is running; database is not connected",
        });
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setApiStatus({ state: "offline", message: error.message || "API is unavailable" });
        }
      });

    return () => controller.abort();
  }, []);

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.manager}`.toLowerCase().includes(query.toLowerCase()),
  );

  const formattedDate = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setActivePage("Dashboard")} aria-label="TaskFlow home">
          <span className="brand-mark"><Check size={19} strokeWidth={3} /></span>
          <span>TaskFlow</span>
        </a>
        <div className="workspace-picker">
          <span className="workspace-dot">A</span>
          <span className="workspace-name">Acme Workspace</span>
          <ChevronDown size={15} />
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="main-nav" aria-label="Main navigation">
          {primaryNavigation.map(({ label, icon: Icon }) => (
            <button
              className={`nav-item${activePage === label ? " active" : ""}`}
              key={label}
              onClick={() => setActivePage(label)}
              aria-label={label}
              type="button"
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <p className="nav-caption nav-caption-spaced">ORGANIZATION</p>
        <nav className="main-nav" aria-label="Organization navigation">
          {secondaryNavigation.map(({ label, icon: Icon, count }) => (
            <button
              className={`nav-item${activePage === label ? " active" : ""}`}
              key={label}
              onClick={() => setActivePage(label)}
              aria-label={label}
              type="button"
            >
              <Icon size={18} />
              <span>{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button aria-label="Help and support" className="nav-item help-link" type="button">
            <CircleHelp size={18} />
            <span>Help &amp; support</span>
          </button>
          <div className="profile-mini">
            <Avatar initials="JD" color="avatar-photo" />
            <span className="profile-copy"><strong>John Doe</strong><small>Project Manager</small></span>
            <MoreHorizontal size={19} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={16} />
              <input
                aria-label="Search projects"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects..."
                value={query}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" aria-label="Notifications" type="button">
              <Bell size={18} />
              <span />
            </button>
            <button className="top-profile" type="button" onClick={() => setActivePage("Settings")}>
              <Avatar initials="JD" color="avatar-photo" />
              <span><strong>John Doe</strong><small>Project Manager</small></span>
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        {activePage === "Dashboard" ? (
          <div className="page-content">
            <div className="welcome-row">
              <div>
                <p className="eyebrow">{formattedDate}</p>
                <h1>Good morning, John <span className="wave">✦</span></h1>
                <p className="subheading">Here&apos;s what&apos;s happening with your projects today.</p>
              </div>
              <div className="welcome-actions">
                <button className="button button-outline" type="button"><CalendarDays size={16} /> This Week <ChevronDown size={14} /></button>
                <button className="button button-primary" type="button" onClick={() => setActivePage("Projects")}><Plus size={17} /> New Project</button>
              </div>
            </div>

            {apiStatus.state !== "connected" && (
              <div className={`api-notice ${apiStatus.state}`} role="status">
                <span className="api-indicator" />
                <div>
                  <strong>{apiStatus.state === "checking" ? "Checking API connection" : apiStatus.state === "offline" ? "Showing sample dashboard data" : "API connected, database needs setup"}</strong>
                  <span>{apiStatus.state === "checking" ? "Connecting to your Render service…" : apiStatus.message}</span>
                </div>
              </div>
            )}

            <section className="stats-grid" aria-label="Project statistics">
              <article className="stat-card">
                <div className="stat-top"><span>Total Projects</span><span className="stat-icon violet-icon"><FolderKanban size={18} /></span></div>
                <strong className="stat-number">24</strong>
                <p><span className="trend-positive">↗ 12%</span> <span>vs. last month</span></p>
              </article>
              <article className="stat-card">
                <div className="stat-top"><span>Completed Tasks</span><span className="stat-icon green-icon"><Check size={18} /></span></div>
                <strong className="stat-number">128</strong>
                <p><span className="trend-positive">↗ 8%</span> <span>vs. last month</span></p>
              </article>
              <article className="stat-card">
                <div className="stat-top"><span>Pending Tasks</span><span className="stat-icon orange-icon"><Clock3 size={18} /></span></div>
                <strong className="stat-number">47</strong>
                <p><span className="trend-warning">• 5 due soon</span> <span>this week</span></p>
              </article>
              <article className="stat-card">
                <div className="stat-top"><span>Upcoming Deadlines</span><span className="stat-icon blue-icon"><CalendarDays size={18} /></span></div>
                <strong className="stat-number">12</strong>
                <p><span className="trend-muted">Next 7 days</span></p>
              </article>
            </section>

            <section className="overview-grid">
              <article className="panel activity-chart-panel">
                <SectionHeading
                  title="Activity Summary"
                  action={<button className="select-button" type="button">This Week <ChevronDown size={14} /></button>}
                />
                <div className="chart-legend">
                  <span><i className="legend-dot violet-dot" /> Tasks Completed</span>
                  <span><i className="legend-dot blue-dot" /> Tasks Created</span>
                </div>
                <div className="chart-wrap" role="img" aria-label="Line chart showing completed and created tasks over the week">
                  <div className="chart-y-labels"><span>30</span><span>20</span><span>10</span><span>0</span></div>
                  <svg className="line-chart" viewBox="0 0 640 188" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="completed-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#6555e8" stopOpacity=".16" />
                        <stop offset="100%" stopColor="#6555e8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="chart-gridline" d="M0 18H640 M0 66H640 M0 114H640 M0 162H640" />
                    <path d="M0 142 L90 123 L180 134 L270 83 L360 104 L450 62 L540 88 L640 31 L640 172 L0 172 Z" fill="url(#completed-fill)" />
                    <path className="chart-line chart-line-violet" d="M0 142 L90 123 L180 134 L270 83 L360 104 L450 62 L540 88 L640 31" />
                    <path className="chart-line chart-line-blue" d="M0 156 L90 147 L180 111 L270 126 L360 82 L450 112 L540 97 L640 116" />
                    <circle className="chart-point-violet" cx="270" cy="83" r="4" />
                    <circle className="chart-point-violet" cx="450" cy="62" r="4" />
                    <circle className="chart-point-violet" cx="640" cy="31" r="4" />
                  </svg>
                  <div className="chart-x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
                </div>
              </article>

              <article className="panel task-overview-panel">
                <SectionHeading title="Tasks Overview" action={<button className="more-button" aria-label="More task overview options" type="button"><MoreHorizontal size={19} /></button>} />
                <div className="donut-area">
                  <div className="donut-chart"><div className="donut-center"><strong>175</strong><span>Total Tasks</span></div></div>
                  <div className="donut-legend">
                    <span><i className="legend-dot green-dot" /> Completed <strong>128 (73%)</strong></span>
                    <span><i className="legend-dot violet-dot" /> Pending <strong>47 (27%)</strong></span>
                    <span><i className="legend-dot gray-dot" /> Overdue <strong>12 (7%)</strong></span>
                  </div>
                </div>
              </article>
            </section>

            <section className="lower-grid">
              <article className="panel projects-panel">
                <SectionHeading
                  title="Recent Projects"
                  action={<button className="text-button" onClick={() => setActivePage("Projects")} type="button">View all <ChevronRight size={15} /></button>}
                />
                <div className="project-list">
                  {filteredProjects.map((project) => (
                    <div className="project-row" key={project.name}>
                      <span className={`project-marker ${project.color}`} />
                      <div className="project-name"><strong>{project.name}</strong><span>{project.manager}</span></div>
                      <span className="project-due">{project.due}</span>
                      <div className="progress-cell"><div className="progress-track"><span className={project.color} style={{ width: `${project.progress}%` }} /></div><small>{project.progress}%</small></div>
                      <span className={`status-pill status-${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span>
                      <button className="row-menu" aria-label={`More options for ${project.name}`} type="button"><MoreHorizontal size={18} /></button>
                    </div>
                  ))}
                  {filteredProjects.length === 0 && <p className="empty-search">No sample projects match “{query}”.</p>}
                </div>
              </article>

              <article className="panel deadlines-panel">
                <SectionHeading title="Upcoming Deadlines" action={<button className="more-button" aria-label="More deadline options" type="button"><MoreHorizontal size={19} /></button>} />
                <div className="deadline-list">
                  {deadlines.map((deadline) => (
                    <div className="deadline-row" key={deadline.title}>
                      <span className={`deadline-marker ${deadline.color}`} />
                      <span className="deadline-copy"><strong>{deadline.title}</strong><small>{deadline.project}</small></span>
                      <span className="deadline-date">{deadline.date}</span>
                    </div>
                  ))}
                </div>
                <button className="calendar-link" onClick={() => setActivePage("Calendar")} type="button">View calendar <ChevronRight size={15} /></button>
              </article>
            </section>

            <article className="panel activity-panel">
              <SectionHeading title="Recent Activity" action={<button className="text-button" onClick={() => setActivePage("Notifications")} type="button">View all <ChevronRight size={15} /></button>} />
              <div className="activity-list">
                {activityItems.map((item) => (
                  <div className="activity-row" key={item.detail}>
                    <Avatar initials={item.initials} color={item.color} small />
                    <p><strong>{item.text}</strong> {item.detail}</p>
                    <span>{item.time}</span>
                  </div>
                ))}
              </div>
            </article>

            <p className="sample-note"><Activity size={14} /> Dashboard numbers and project entries are sample content for this first build step.</p>
          </div>
        ) : (
          <section className="coming-soon">
            <div className="coming-icon">
              {activePage === "Projects" ? <FolderKanban size={26} /> : activePage === "Tasks" ? <ListTodo size={26} /> : activePage === "Calendar" ? <CalendarDays size={26} /> : activePage === "Notifications" ? <Bell size={26} /> : <Users size={26} />}
            </div>
            <p className="eyebrow">TASKFLOW WORKSPACE</p>
            <h1>{activePage}</h1>
            <p>This section is next in the build. The dashboard is the first UI step; we&apos;ll connect the real project and task data in the next step.</p>
            <button className="button button-outline" onClick={() => setActivePage("Dashboard")} type="button"><ChevronLeft size={16} /> Back to dashboard</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
