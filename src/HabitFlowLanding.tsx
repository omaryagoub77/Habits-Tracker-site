import React, { useRef, useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import Silk from './components/Silk';

/* ==========================================================================
   Iconography — lightweight inline SVG so the site does not depend on the
   Material Symbols webfont (which required a network request and rendered as
   empty boxes whenever the font had not loaded).
   ========================================================================== */

type IconProps = { className?: string };

const S = ({ className = 'size-5', children }: IconProps & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const IconLeaf = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 11-4 16-9 16Z" />
    <path d="M4 20c3-6 8-9 13-11" />
  </S>
);

const IconCheck = ({ className }: IconProps) => (
  <S className={className}>
    <path d="m5 13 4 4L19 7" />
  </S>
);

const IconLock = ({ className }: IconProps) => (
  <S className={className}>
    <rect x="4" y="10" width="16" height="11" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </S>
);

const IconTimer = ({ className }: IconProps) => (
  <S className={className}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6" />
  </S>
);

const IconBell = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M18 15V10a6 6 0 0 0-12 0v5l-1.5 2.5h15L18 15Z" />
    <path d="M10 20a2.2 2.2 0 0 0 4 0" />
  </S>
);

const IconChart = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M5 20V10M12 20V4M19 20v-7" />
    <path d="M2.5 20h19" />
  </S>
);

const IconFlame = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M12 22c3.6 0 6-2.4 6-5.6 0-4.2-4-5.6-4-9.4-2 1-3 2.6-3 4.4-1-.6-1.6-1.6-1.6-2.8C7.4 10 6 12 6 14.6 6 19 8.4 22 12 22Z" />
  </S>
);

const IconMoon = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </S>
);

const IconSun = ({ className }: IconProps) => (
  <S className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </S>
);

const IconCloudOff = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M6.5 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 17 8.3" />
    <path d="M17.5 18H6.5" />
    <path d="m3 3 18 18" />
  </S>
);

const IconBook = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
    <path d="M4 5.5v15" />
  </S>
);

const IconWater = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M12 3s6 6.2 6 10.2A6 6 0 0 1 6 13.2C6 9.2 12 3 12 3Z" />
  </S>
);

const IconDumbbell = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
  </S>
);

const IconLotus = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M12 4c1.8 2 2.6 3.8 2.6 5.6 0 1.6-1.2 2.8-2.6 2.8s-2.6-1.2-2.6-2.8C9.4 7.8 10.2 6 12 4Z" />
    <path d="M4 12c2.4-.6 4.4-.2 5.8 1M20 12c-2.4-.6-4.4-.2-5.8 1" />
    <path d="M6 19c1.8-2.4 3.8-3.6 6-3.6s4.2 1.2 6 3.6" />
  </S>
);

const IconPlus = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

const IconSliders = ({ className }: IconProps) => (
  <S className={className}>
    <path d="M4 7h10M18 7h2M4 17h6M14 17h6" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="12" cy="17" r="2" />
  </S>
);

const IconChevron = ({ className }: IconProps) => (
  <S className={className}>
    <path d="m9 6 6 6-6 6" />
  </S>
);

/* ==========================================================================
   Reduced-motion hook (window.matchMedia is unavailable during SSR/tests).
   ========================================================================== */

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

/* ==========================================================================
   Device mockups — the previous raster screenshots showed the retired green
   identity, so the previews are rendered live from the Hybrid Premium tokens
   and stay in sync with the design system.
   ========================================================================== */

const PhoneFrame = ({
  children,
  label,
  className = '',
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) => (
  <div className={`relative shrink-0 ${className}`}>
    <div className="relative w-[286px] overflow-hidden rounded-[42px] border border-white/10 bg-[#0b0b0c] p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
      <div
        className="relative flex h-[600px] flex-col overflow-hidden rounded-[34px] bg-background-dark"
        role="img"
        aria-label={label}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-0.5 text-[10px] font-semibold text-ink">
          <span className="tabular-nums">9:41</span>
          <div className="flex items-center gap-1.5 text-ink-secondary" aria-hidden="true">
            <span className="block h-2.5 w-4 rounded-[3px] border border-current opacity-70" />
            <span className="block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          </div>
        </div>
        {children}
      </div>
    </div>
    <div
      className="pointer-events-none absolute -inset-8 -z-10 rounded-[60px] bg-[radial-gradient(circle_at_50%_30%,rgba(120,93,232,0.28),transparent_70%)] blur-2xl"
      aria-hidden="true"
    />
  </div>
);

const ProgressRing = ({
  progress,
  size = 132,
  stroke = 12,
  children,
  label,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  label?: string;
}) => {
  // Unique per instance: several rings render on the page at once.
  const gradientId = `ringGradient-${useId()}`;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={label ?? `${Math.round(clamped * 100)} percent complete`}
      >
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#242424" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9B5DF0" />
            <stop offset="100%" stopColor="#785DE8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
};

const FloatingTabBar = ({ active = 'today' }: { active?: 'today' | 'reports' | 'focus' | 'settings' }) => {
  const tabs = [
    { id: 'today', label: 'Today', icon: IconLeaf },
    { id: 'reports', label: 'Reports', icon: IconChart },
    { id: 'focus', label: 'Focus', icon: IconTimer },
    { id: 'settings', label: 'Settings', icon: IconSliders },
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3">
      <div className="glass-surface flex items-center gap-0.5 rounded-[24px] px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <div
              key={tab.id}
              className={`flex w-[58px] flex-col items-center gap-0.5 rounded-2xl px-1 py-1.5 ${
                isActive ? 'bg-accent-tint text-accent-soft' : 'text-ink-muted'
              }`}
            >
              <Icon className="size-4.5" />
              <span className="text-[8.5px] font-semibold tracking-wide">{tab.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ScreenToday = () => {
  const habits = [
    { name: 'Drink Water', streak: '12 day streak', icon: IconWater, done: false },
    { name: 'Reading', streak: '5 day streak', icon: IconBook, done: false },
    { name: 'Morning Workout', streak: '3 day streak', icon: IconDumbbell, done: false },
    { name: 'Meditation', streak: '21 day streak', icon: IconLotus, done: true },
  ];

  return (
    <PhoneFrame
      label="Preview of the Today screen: a circular daily progress ring reading 1 of 4 completed, habit cards with circular completion controls, and a floating bottom navigation bar."
    >
      <div className="flex flex-1 flex-col px-4 pt-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-[24px] font-bold leading-tight text-ink">Today</h4>
            <p className="text-[12px] text-ink-secondary">Tuesday, October 24</p>
          </div>
          <div className="grid size-9 place-items-center rounded-full bg-accent-tint text-accent-soft">
            <IconLeaf className="size-4.5" />
          </div>
        </div>

        <div
          className="mt-3 flex items-center gap-3.5 rounded-[20px] border border-white/8 bg-surface p-3"
          aria-hidden="false"
        >
          <ProgressRing
            progress={0.25}
            size={88}
            stroke={9}
            label="Daily goal progress: 1 of 4 habits completed"
          >
            <div>
              <p className="text-[20px] font-bold leading-none text-ink tabular-nums">25%</p>
              <p className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-accent-soft">
                Daily goal
              </p>
            </div>
          </ProgressRing>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-ink">1 of 4 completed</p>
            <p className="mt-0.5 text-[10px] leading-snug text-ink-muted">
              Progress shown as a single circular indicator.
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">Ongoing</p>
          <IconSliders className="size-3.5 text-ink-muted" />
        </div>

        <div className="mt-2 space-y-1.5">
          {habits.map((habit) => {
            const Icon = habit.icon;
            return (
              <div
                key={habit.name}
                className={`flex items-center gap-2.5 rounded-[16px] border px-2.5 py-1.5 ${
                  habit.done ? 'border-accent-border/50 bg-accent-tint/60' : 'border-white/6 bg-surface'
                }`}
              >
                <div
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ${
                    habit.done ? 'bg-primary/25 text-accent-soft' : 'bg-surface-elevated text-accent-light'
                  }`}
                >
                  <Icon className="size-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-[13px] font-semibold ${
                      habit.done ? 'text-ink-secondary' : 'text-ink'
                    }`}
                  >
                    {habit.name}
                  </p>
                  <p className="flex items-center gap-1 text-[10px] text-ink-muted">
                    <IconFlame className="size-3" />
                    {habit.streak}
                  </p>
                </div>
                {/* Completion is communicated by a glyph as well as colour. */}
                <div
                  className={`grid size-7 shrink-0 place-items-center rounded-full ${
                    habit.done
                      ? 'bg-primary text-white'
                      : 'border-2 border-white/15 bg-transparent text-transparent'
                  }`}
                >
                  <IconCheck className="size-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inline "New habit" action, matching the app's real entry point. */}
      <div className="pointer-events-none absolute inset-x-4 bottom-[62px] flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-accent-tint/80 py-2 text-[12px] font-bold text-accent-soft">
        <IconPlus className="size-3.5" />
        New habit
      </div>

      <FloatingTabBar active="today" />
    </PhoneFrame>
  );
};

const ScreenReports = () => {
  const bars = [
    { day: 'M', value: 0.6 },
    { day: 'T', value: 0.85 },
    { day: 'W', value: 0.35 },
    { day: 'T', value: 1 },
    { day: 'F', value: 0.7 },
    { day: 'S', value: 0.45 },
    { day: 'S', value: 0.2 },
  ];

  return (
    <PhoneFrame label="Preview of the Reports screen: a violet weekly completion chart with thin columns, a monthly overview bar strip, and streak statistics on clean surfaces.">
      <div className="flex flex-1 flex-col px-4 pt-2">
        <h4 className="text-[24px] font-bold leading-tight text-ink">Reports</h4>
        <p className="text-[12px] text-ink-secondary">This week</p>

        <div className="mt-3 rounded-[20px] border border-white/8 bg-surface p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold text-ink">Weekly consistency</p>
            <span className="shrink-0 rounded-full bg-accent-tint px-2.5 py-1 text-[9px] font-bold text-accent-soft">
              Violet series
            </span>
          </div>

          {/* Columns carry the value; empty days are simply short, with no
              repeated "no data" captions. */}
          <div className="mt-3 flex h-[134px] items-end gap-2">
            {bars.map((bar, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-[112px] w-full items-end justify-center">
                  <div
                    className="w-2 rounded-full bg-gradient-to-t from-primary to-accent-light"
                    style={{ height: `${Math.max(8, bar.value * 112)}px` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-ink-muted">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-white/8 bg-surface p-3">
            <IconFlame className="size-4 text-accent-light" />
            <p className="mt-1.5 text-[19px] font-bold leading-none text-ink tabular-nums">12</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-ink-muted">Day streak</p>
          </div>
          <div className="rounded-[18px] border border-white/8 bg-surface p-3">
            <IconChart className="size-4 text-accent-light" />
            <p className="mt-1.5 text-[19px] font-bold leading-none text-ink tabular-nums">85%</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-ink-muted">Consistency</p>
          </div>
        </div>

        <div className="mt-2.5 rounded-[18px] border border-white/8 bg-surface p-3">
          <p className="text-[12px] font-semibold text-ink">Monthly overview</p>
          <div className="mt-2 flex items-end gap-1.5">
            {[0.4, 0.65, 0.5, 0.8, 0.6, 0.9, 0.7, 1, 0.55, 0.75].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-accent-soft/45"
                style={{ height: `${Math.max(6, v * 26)}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      <FloatingTabBar active="reports" />
    </PhoneFrame>
  );
};

const ScreenFocus = () => (
  <PhoneFrame label="Preview of the Focus Session screen: a Timer and Stopwatch mode toggle, a large circular countdown selector with numbers inside the ring, the habit being focused on, and sound settings.">
    <div className="flex flex-1 flex-col px-4 pt-2">
      <h4 className="text-[24px] font-bold leading-tight text-ink">Focus</h4>
      <p className="text-[12px] text-ink-secondary">Focus on habit: Reading</p>

      <div className="mt-3 flex rounded-2xl border border-white/8 bg-surface p-1">
        <div className="flex-1 rounded-xl bg-primary py-2 text-center text-[12px] font-bold text-white">Timer</div>
        <div className="flex-1 rounded-xl py-2 text-center text-[12px] font-semibold text-ink-muted">Stopwatch</div>
      </div>

      <div className="mt-[18px] grid place-items-center">
        <ProgressRing progress={0.68} size={182} stroke={12} label="Focus timer progress: 68 percent remaining">
          <div>
            <p className="text-[36px] font-bold leading-none text-ink tabular-nums">17:04</p>
            <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-accent-soft">
              Remaining
            </p>
          </div>
        </ProgressRing>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(120,93,232,0.5)]"
        >
          <IconTimer className="size-5" />
        </button>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-full border border-white/10 bg-surface text-ink-secondary"
        >
          <IconPlus className="size-5 rotate-45" />
        </button>
      </div>

      <div className="mt-3.5 rounded-[18px] border border-white/8 bg-surface px-3.5 py-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Sound</p>
        <p className="mt-0.5 text-[11px] leading-snug text-ink-secondary">
          On completion: the alarm sound when enabled, vibration as the fallback.
        </p>
      </div>
    </div>

    <FloatingTabBar active="focus" />
  </PhoneFrame>
);

const ScreenAlarms = () => (
  <PhoneFrame label="Preview of the Alarms screen: a circular time selector shown directly inside the ring with hours and minutes, Once and Every day repeat options, and violet save and cancel controls.">
    <div className="flex flex-1 flex-col px-4 pt-2">
      <h4 className="text-[24px] font-bold leading-tight text-ink">New alarm</h4>
      <p className="text-[12px] text-ink-secondary">Circular selector opens immediately</p>

      <div className="mt-2.5 grid place-items-center">
        <div className="relative grid size-[172px] place-items-center rounded-full border border-accent-border/60 bg-accent-tint/40">
          <div className="absolute inset-3 rounded-full border border-white/6" aria-hidden="true" />
          <div className="text-center">
            <div className="flex items-end justify-center gap-1 tabular-nums">
              <span className="text-[38px] font-bold leading-none text-ink">07</span>
              <span className="pb-1 text-[28px] font-bold leading-none text-accent-soft">:</span>
              <span className="text-[38px] font-bold leading-none text-ink">30</span>
            </div>
            <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-soft">AM</p>
          </div>
          {/* Selection indicators sit on the ring itself. */}
          <span className="absolute left-1/2 top-1.5 size-2 -translate-x-1/2 rounded-full bg-accent-light" aria-hidden="true" />
          <span className="absolute bottom-1.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-white/20" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-3.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Repeat</p>
        <div className="mt-1.5 flex gap-2">
          <div className="flex-1 rounded-xl bg-primary py-2 text-center text-[12px] font-bold text-white">
            Every day
          </div>
          <div className="flex-1 rounded-xl border border-white/8 bg-surface py-2 text-center text-[12px] font-semibold text-ink-secondary">
            Once
          </div>
        </div>
      </div>

      <div className="mt-2.5 rounded-[18px] border border-white/8 bg-surface px-3.5 py-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Sound &amp; vibration</p>
        <p className="mt-0.5 text-[11px] text-ink-secondary">Alarm tone · haptics on · snooze available</p>
      </div>

      {/* Sits clear of the floating tab bar. */}
      <div className="mt-auto pb-[74px]">
        <div className="flex gap-2.5">
          <div className="flex-1 rounded-xl border border-white/8 bg-surface py-2.5 text-center text-[12px] font-semibold text-ink-secondary">
            Cancel
          </div>
          <div className="flex-1 rounded-xl bg-primary py-2.5 text-center text-[12px] font-bold text-white">
            Save alarm
          </div>
        </div>
      </div>
    </div>

    <FloatingTabBar active="settings" />
  </PhoneFrame>
);

/* ==========================================================================
   Landing page
   ========================================================================== */

const APP_DOWNLOAD_URL = 'https://expo.dev/artifacts/eas/j9ubvr7yz6BpBq1HAQVxrP.apk';

const HabitFlowLanding = () => {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const featuresRef = useRef<HTMLElement>(null);
  const screensRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);

  const capabilities = [
    { icon: IconBell, title: 'Alarms that reach you', desc: 'Repeating or one-off alarms scheduled through the OS, so a locked screen still rings.' },
    { icon: IconTimer, title: 'Focus sessions', desc: 'A countdown timer and a stopwatch, tied to the habit you are working on.' },
    { icon: IconChart, title: 'Reports & records', desc: 'Weekly and monthly views built from your own stored completion history.' },
    { icon: IconMoon, title: 'Light & dark themes', desc: 'One violet identity that stays legible in either appearance.' },
    { icon: IconCloudOff, title: 'Works offline', desc: 'No account, no sync requirement. Tracking keeps working without a connection.' },
    { icon: IconLock, title: 'Stays on your device', desc: 'Your habits and history live in a local database on the phone.' },
  ];

  const steps = [
    { num: '1', title: 'Create a habit', desc: 'Name it, choose an icon and a schedule, and set an optional reminder.' },
    { num: '2', title: 'Check in daily', desc: 'One tap on the circular control marks completion and updates your progress.' },
    { num: '3', title: 'Read the pattern', desc: 'Streaks, weekly charts, and monthly overviews surface what is actually happening.' },
  ];

  const faqs = [
    {
      q: 'Is HabitFlow free?',
      a: 'Yes. The tracking, focus, alarm, and reporting features are free to use, and no account is required to start.',
    },
    {
      q: 'Where is my data stored?',
      a: 'In a local database on your device. HabitFlow is built to work offline without sending your history to a server.',
    },
    {
      q: 'Which platforms are supported?',
      a: 'HabitFlow is built with React Native and Expo. The current downloadable build is for Android; the interface is designed against both iOS and Android conventions.',
    },
    {
      q: 'Do alarms work when the screen is locked?',
      a: 'Alarms and reminders are scheduled as native OS notifications, which is what allows them to fire while the app is backgrounded or the device is locked. Exact behaviour depends on the notification permissions and battery settings of the device.',
    },
    {
      q: 'Can I export my habits?',
      a: 'Not yet. Data export is on the roadmap rather than in the current build, so your records stay inside the app for now.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const roadmap = [
    { label: 'Data export and import', badge: 'Next', state: 'next' as const },
    { label: 'iOS build', badge: 'Planned', state: 'planned' as const },
    { label: 'Home screen widgets', badge: 'Exploring', state: 'planned' as const },
  ];

  return (
    <>
      <SplashCursor />
      <div className="dark bg-background-dark text-foreground antialiased overflow-x-hidden min-h-screen">
        {/* Navigation */}
        <motion.nav
          className="fixed top-0 z-50 w-full border-b border-white/8 bg-background-dark/70 backdrop-blur-md"
          initial={prefersReducedMotion ? { y: 0 } : { y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-accent-tint text-accent-soft">
                <IconLeaf className="size-5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">HabitFlow</h2>
            </div>

            <div className="hidden items-center gap-7 md:flex">
              {[
                { label: 'Features', ref: featuresRef },
                { label: 'Screens', ref: screensRef },
                { label: 'FAQ', ref: faqRef },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollTo(item.ref)}
                  className="text-sm font-medium text-ink-secondary transition-colors hover:text-accent-soft"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <motion.a
              href={APP_DOWNLOAD_URL}
              download
              className="rounded-full border border-primary/30 bg-primary/12 px-4 py-1.5 text-sm font-bold text-accent-soft transition-colors hover:bg-primary/22"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              Download
            </motion.a>
          </div>
        </motion.nav>

        {/* Atmospheric violet field — static (no continuous full-screen loop),
            kept faint so it never competes with the content on top of it. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[820px] overflow-hidden opacity-[0.32]"
          style={{
            zIndex: 0,
            maskImage: 'radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 72%)',
          }}
          aria-hidden="true"
        >
          <Silk speed={4} scale={1} color="#2A1F4D" noiseIntensity={0.8} rotation={0} />
        </div>

        <main className="relative z-10">
          {/* Hero */}
          <section className="relative overflow-hidden px-6 pb-16 pt-28">
            <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <motion.div
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-border/60 bg-accent-tint/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-soft"
                  initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                  animate={fadeIn.visible}
                  transition={{ duration: 0.6 }}
                >
                  Hybrid Premium · Violet
                </motion.div>

                <motion.h1
                  className="mb-6 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
                  initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
                  animate={fadeInUp.visible}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                >
                  Build the habit.
                  <br />
                  <span className="text-accent-light">Keep the streak.</span>
                </motion.h1>

                <motion.p
                  className="mb-8 max-w-xl text-lg leading-relaxed text-ink-secondary"
                  initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
                  animate={fadeInUp.visible}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                >
                  HabitFlow is a habit tracker, focus timer, and alarm in one calm app. Track daily
                  completion, run focus sessions on the habit you are working on, and read your progress
                  from real records — all in a near-black interface built around a single violet accent.
                </motion.p>

                <motion.div
                  className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                  initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
                  animate={fadeInUp.visible}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
                >
                  <a
                    href={APP_DOWNLOAD_URL}
                    download
                    className="accent-glow rounded-2xl bg-primary px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-pressed"
                  >
                    Download for Android
                  </a>
                  <button
                    type="button"
                    onClick={() => scrollTo(screensRef)}
                    className="rounded-2xl border border-white/10 bg-white/4 px-6 py-3.5 text-base font-semibold text-ink-secondary transition-colors hover:text-white"
                  >
                    Preview the screens
                  </button>
                </motion.div>

                <motion.p
                  className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted"
                  initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                  animate={fadeIn.visible}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  No account required · Works offline · No ads
                </motion.p>
              </div>

              <motion.div
                className="flex justify-center lg:justify-end"
                initial={prefersReducedMotion ? fadeIn.visible : { opacity: 0, y: 30 }}
                animate={fadeIn.visible}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
              >
                <ScreenToday />
              </motion.div>
            </div>
          </section>

          {/* What it is */}
          <motion.section
            id="features"
            ref={featuresRef}
            className="scroll-mt-24 px-6 py-14"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="mx-auto max-w-6xl">
              <motion.div
                className="glass-card relative overflow-hidden rounded-[26px] p-8 md:p-10"
                whileHover={prefersReducedMotion ? {} : { borderColor: 'rgba(120, 93, 232, 0.35)' }}
              >
                <div className="absolute -right-6 -top-6 text-primary/8" aria-hidden="true">
                  <IconLeaf className="size-[140px]" />
                </div>
                <h2 className="relative mb-4 text-2xl font-bold text-white md:text-3xl">
                  Most trackers treat your routine like a game
                </h2>
                <p className="relative max-w-3xl leading-relaxed text-ink-secondary">
                  Endless popups, noisy leaderboards, and streaks that punish you for missing a Tuesday.
                  HabitFlow takes the opposite approach: one tap to check in, a circular goal indicator
                  instead of a wall of charts, and colour reserved for what actually changed. The violet
                  accent marks progress and selection — it never decorates for its own sake.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* Feature grid */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-6xl">
              <div className="mb-9 flex items-center gap-4">
                <motion.div
                  className="h-px flex-1 bg-white/10"
                  initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-secondary">
                  Everything in the app
                </h3>
                <motion.div
                  className="h-px flex-1 bg-white/10"
                  initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {capabilities.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      className="group rounded-[22px] border border-white/6 bg-surface p-6 transition-colors hover:border-primary/35"
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                      viewport={{ once: true, margin: '-50px' }}
                      whileHover={prefersReducedMotion ? {} : { y: -6 }}
                    >
                      <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-accent-tint text-accent-light">
                        <Icon className="size-5" />
                      </div>
                      <h4 className="mb-1.5 text-sm font-bold text-white">{feature.title}</h4>
                      <p className="text-[13px] leading-relaxed text-ink-muted">{feature.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Routine */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-6xl">
              <motion.h2
                className="mb-10 text-center text-3xl font-bold text-white"
                initial={prefersReducedMotion ? fadeInUp.visible : fadeInUp.hidden}
                whileInView={fadeInUp.visible}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                How the daily loop works
              </motion.h2>

              <div className="relative mx-auto grid max-w-3xl gap-10">
                <motion.div
                  className="absolute bottom-4 left-6 top-4 hidden w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent sm:block"
                  initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  viewport={{ once: true }}
                  aria-hidden="true"
                />

                {steps.map((step, idx) => (
                  <motion.div
                    key={step.num}
                    className="relative flex items-start gap-6"
                    initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <div className="z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-primary bg-background-dark font-bold text-accent-soft">
                      {step.num}
                    </div>
                    <div className="pt-2">
                      <h4 className="mb-1 text-lg font-bold text-white">{step.title}</h4>
                      <p className="text-sm leading-relaxed text-ink-secondary">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Screens */}
          <motion.section
            id="screens"
            ref={screensRef}
            className="scroll-mt-24 px-6 py-14"
          >
            <div className="mx-auto max-w-6xl">
              <motion.h2
                className="mb-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-ink-muted"
                initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                whileInView={fadeIn.visible}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                The Experience
              </motion.h2>
              <motion.p
                className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-ink-secondary"
                initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                whileInView={fadeIn.visible}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Live previews of four screens, rendered with the same violet design tokens the app uses.
                Numbers shown are illustrative of the layout, not saved records.
              </motion.p>

              <div className="flex snap-x gap-6 overflow-x-auto pb-8 no-scrollbar">
                {[
                  { node: <ScreenToday />, title: 'Today' },
                  { node: <ScreenReports />, title: 'Reports' },
                  { node: <ScreenFocus />, title: 'Focus Session' },
                  { node: <ScreenAlarms />, title: 'Alarms' },
                ].map((screen, idx) => (
                  <motion.div
                    key={screen.title}
                    className="snap-center"
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    {screen.node}
                    <p className="mt-4 text-center text-sm font-semibold text-accent-soft">
                      {screen.title}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-ink-muted"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                ← Swipe or scroll to explore →
              </motion.p>
            </div>
          </motion.section>

          {/* Roadmap */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-3xl">
              <motion.h3
                className="mb-6 text-2xl font-bold text-white"
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                What is next
              </motion.h3>

              <div className="space-y-3.5">
                {roadmap.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className={`flex items-center justify-between rounded-2xl border border-white/6 bg-white/4 p-4 ${
                      item.state === 'planned' ? 'opacity-70' : ''
                    }`}
                    initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                    whileInView={{ opacity: item.state === 'planned' ? 0.7 : 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    <span className="font-medium text-ink-secondary">{item.label}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        item.state === 'next'
                          ? 'bg-primary/20 text-accent-soft'
                          : 'bg-white/10 text-ink-muted'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                Listed as direction, not as shipped features. Anything already working in the app is
                described above, not here.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="px-6 py-12" ref={faqRef}>
            <div className="mx-auto max-w-3xl">
              <motion.h3
                className="mb-6 text-center text-2xl font-bold text-white"
                initial={prefersReducedMotion ? fadeIn.visible : fadeIn.hidden}
                whileInView={fadeIn.visible}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Frequently asked
              </motion.h3>

              <div className="space-y-3">
                {faqs.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <motion.div
                      key={item.q}
                      className="overflow-hidden rounded-2xl border border-white/6 bg-surface"
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
                      viewport={{ once: true, margin: '-50px' }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left"
                      >
                        <span className="text-sm font-bold text-white">{item.q}</span>
                        <IconChevron
                          className={`size-4 shrink-0 text-accent-soft transition-transform duration-300 ${
                            isOpen ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <motion.p
                          className="px-4 pb-4 text-sm leading-relaxed text-ink-secondary"
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.a}
                        </motion.p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 py-16">
            <div className="mx-auto max-w-3xl">
              <motion.div
                className="relative overflow-hidden rounded-[28px] border border-primary/25 bg-primary/12 p-10 text-center"
                initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <div
                  className="pointer-events-none absolute -left-12 -top-12 size-52 rounded-full bg-primary/25 blur-3xl"
                  aria-hidden="true"
                />

                <h2 className="relative mb-3 text-3xl font-black text-white">Start with one habit</h2>
                <p className="relative mx-auto mb-8 max-w-md leading-snug text-ink-secondary">
                  Pick a single thing worth repeating, then let the app keep track of the rest.
                </p>

                <motion.a
                  href={APP_DOWNLOAD_URL}
                  download
                  className="relative z-10 mb-4 block w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02, backgroundColor: '#6348D5' }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  Download the Android build
                </motion.a>

                <p className="relative text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Free · Local-first · No ads
                </p>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <motion.footer className="border-t border-white/6 px-6 py-12 text-center">
            <div className="mb-6 flex justify-center gap-3 text-accent-soft/70">
              <IconLeaf className="size-6" />
              <IconSun className="size-6" />
              <IconMoon className="size-6" />
            </div>

            <p className="mb-2 text-xs text-ink-muted">
              © {new Date().getFullYear()} HabitFlow. All rights reserved.
            </p>
            <p className="mx-auto mb-6 max-w-md text-xs leading-relaxed text-ink-muted">
              Built with React Native and Expo. HabitFlow is an independent app and is not affiliated with
              any other habit-tracking product.
            </p>

            <div className="flex justify-center gap-6 text-xs font-medium text-ink-secondary">
              {[
                { label: 'Privacy', href: '#' },
                { label: 'Terms', href: '#' },
                { label: 'Support', href: '#' },
              ].map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={prefersReducedMotion ? {} : { color: '#A99AF7', y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.footer>
        </main>
      </div>
    </>
  );
};

export default HabitFlowLanding;
