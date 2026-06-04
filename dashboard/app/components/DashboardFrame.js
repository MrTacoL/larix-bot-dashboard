import {
  Activity,
  AlarmClock,
  Award,
  BadgeCheck,
  BarChart3,
  Bot,
  CircleHelp,
  DoorOpen,
  LayoutDashboard,
  LifeBuoy,
  MessageSquarePlus,
  PanelTop,
  ScanLine,
  ScrollText,
  Search,
  Shield,
  Star,
  TerminalSquare,
  Trophy,
  UserPlus,
  Volume2,
  Workflow
} from 'lucide-react';
import { navGroups } from '../config/modules';

const icons = {
  Activity,
  AlarmClock,
  Award,
  BadgeCheck,
  BarChart3,
  CircleHelp,
  DoorOpen,
  LayoutDashboard,
  LifeBuoy,
  MessageSquarePlus,
  PanelTop,
  ScanLine,
  ScrollText,
  Search,
  Shield,
  Star,
  TerminalSquare,
  Trophy,
  UserPlus,
  Volume2,
  Workflow
};

function NavIcon({ name }) {
  const Icon = icons[name] || Bot;
  return <Icon aria-hidden="true" size={17} strokeWidth={2.2} />;
}

export default function DashboardFrame({ title, description, activePath = '/', badge = 'Online', actions, children }) {
  return (
    <div className="appShell">
      <aside className="sidebar">
        <a className="brand" href="/">
          <span className="brandMark"><Bot size={18} /></span>
          <span>Larix</span>
        </a>

        <nav className="navGroups" aria-label="Dashboard">
          {navGroups.map(group => (
            <section className="navGroup" key={group.title}>
              <h2>{group.title}</h2>
              <div className="navItems">
                {group.items.map(([label, icon, href]) => (
                  <a className={href === activePath ? 'navItem active' : 'navItem'} href={href} key={href}>
                    <NavIcon name={icon} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <main className="mainPane">
        <header className="topBar">
          <div className="titleBlock">
            <p className="eyebrow">Discord Control Center</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="topActions">
            <span className="statusPill"><span />{badge}</span>
            {actions}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
