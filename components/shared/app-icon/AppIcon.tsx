interface AppIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function AppIcon({ name, size = 40, className }: AppIconProps) {
  return (
    <svg width={size} height={size} className={className}>
      <use xlinkHref={`/assets/sprite.svg#${name}`} />
    </svg>
  );
}
