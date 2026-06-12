import { Activity, Car, Cpu, Radio, Shield, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Activity, text: 'Real-Time Traffic Intelligence' },
  { icon: Cpu, text: 'AI-Powered Route Optimization' },
  { icon: Radio, text: 'Live Signal & Sensor Monitoring' },
  { icon: Shield, text: 'Secure City-Wide Control' },
];

export function BrandingPanel() {
  return (
    <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden bg-background px-10 py-12">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-accent/8 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-primary/5 blur-[60px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Border right */}
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-[0_0_30px_rgba(21,96,189,0.3)]">
          <Car className="h-10 w-10 text-primary" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          <span className="label-meta text-accent">Smart City Platform</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Smart Traffic
          <br />
          <span className="text-primary">Management System</span>
        </h1>
        <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
          Real-Time Traffic Intelligence &amp; AI-Powered Route Optimization for
          modern cities.
        </p>

        {/* Features */}
        <ul className="w-full space-y-3">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-2.5 text-left backdrop-blur-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs text-muted-foreground">{text}</span>
            </li>
          ))}
        </ul>

        {/* Live indicator */}
        <div className="mt-8 flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
          <span className="text-xs text-muted-foreground">
            System operational &mdash; all services live
          </span>
        </div>
      </div>
    </div>
  );
}
