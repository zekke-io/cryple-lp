type ArmadilloSymbol = 'ball' | 'ball-cream' | 'open-cream' | 'open-app';

interface ArmadilloProps {
  symbol: ArmadilloSymbol;
  className?: string;
  width?: number;
  height?: number;
  label?: string;
}

export default function Armadillo({ symbol, className, width, height, label }: ArmadilloProps) {
  const accessibility = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true };
  return (
    <svg className={className} width={width} height={height} {...accessibility}>
      <use href={`#zk-${symbol}`} width="100%" height="100%" />
    </svg>
  );
}
