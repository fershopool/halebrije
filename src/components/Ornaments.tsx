// Ornamentos SVG inspirados en alebrijes: coloridos, simétricos, con contorno oscuro.
// Todos son decorativos (aria-hidden) y deterministas (seguros para SSR).
import { alebrijePalette } from '../config/palette';
const ink = '#1b0f3a';

type OrnamentProps = { colors?: string[]; className?: string };

/** Mandala de pétalos concéntricos. Úsalo con `className="spin-slow"` para girar. */
export function Mandala({
  colors = alebrijePalette,
  className = '',
  layers = 4,
}: OrnamentProps & { layers?: number }) {
  return (
    <svg className={`ornament ${className}`} viewBox="-100 -100 200 200" aria-hidden="true">
      {Array.from({ length: layers }, (_, l) => {
        const n = 8 + l * 4;
        const r = 96 - l * 22;
        return (
          <g
            key={l}
            fill={colors[l % colors.length]}
            stroke={ink}
            strokeWidth="1.6"
            transform={`rotate(${l % 2 ? 180 / n : 0})`}
          >
            {Array.from({ length: n }, (_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy={-r * 0.62}
                rx={Math.max(5, r * 0.15)}
                ry={r * 0.38}
                transform={`rotate(${(i * 360) / n})`}
              />
            ))}
          </g>
        );
      })}
      <circle r="14" fill={colors[layers % colors.length]} stroke={ink} strokeWidth="1.6" />
      <circle r="5" fill={ink} />
    </svg>
  );
}

/** Flor de 6 pétalos redondos con centro punteado. */
export function Flower({ colors = alebrijePalette, className = '' }: OrnamentProps) {
  return (
    <svg className={`ornament ${className}`} viewBox="-50 -50 100 100" aria-hidden="true">
      <g stroke={ink} strokeWidth="1.6">
        {Array.from({ length: 6 }, (_, i) => (
          <circle
            key={i}
            cx="0"
            cy="-26"
            r="15"
            fill={colors[i % colors.length]}
            transform={`rotate(${i * 60})`}
          />
        ))}
        <circle r="16" fill={colors[(colors.length - 1) % colors.length]} />
      </g>
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx="0" cy="-9" r="1.8" fill={ink} transform={`rotate(${i * 45})`} />
      ))}
    </svg>
  );
}

/** Pluma / hoja con nervaduras y puntos, para colas y alas de alebrije. */
export function Feather({ colors = alebrijePalette, className = '' }: OrnamentProps) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 60 120" aria-hidden="true">
      <path
        d="M30 4C58 30 58 80 30 116 2 80 2 30 30 4Z"
        fill={colors[0]}
        stroke={ink}
        strokeWidth="1.6"
      />
      <path
        d="M30 20C48 40 48 74 30 100 12 74 12 40 30 20Z"
        fill={colors[1 % colors.length]}
        stroke={ink}
        strokeWidth="1.4"
      />
      <path
        d="M30 36C40 50 40 68 30 84 20 68 20 50 30 36Z"
        fill={colors[2 % colors.length]}
        stroke={ink}
        strokeWidth="1.2"
      />
      <path d="M30 8V112" stroke={ink} strokeWidth="1.4" />
      {[30, 48, 66, 84].map((y) => (
        <circle key={y} cx="30" cy={y} r="2.2" fill={ink} />
      ))}
    </svg>
  );
}

/** Ojo de alebrije: iris concéntrico con pestañas. */
export function Eye({ colors = alebrijePalette, className = '' }: OrnamentProps) {
  return (
    <svg className={`ornament ${className}`} viewBox="-50 -30 100 60" aria-hidden="true">
      <path d="M-46 0Q0-44 46 0Q0 44-46 0Z" fill="#fff" stroke={ink} strokeWidth="2" />
      <circle r="19" fill={colors[0]} stroke={ink} strokeWidth="1.6" />
      <circle r="12" fill={colors[3 % colors.length]} />
      <circle r="6" fill={ink} />
      <circle cx="-3" cy="-3" r="2" fill="#fff" />
      {[-30, -15, 0, 15, 30].map((a) => (
        <line
          key={a}
          x1="0"
          y1="-30"
          x2="0"
          y2="-42"
          stroke={ink}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${a})`}
        />
      ))}
    </svg>
  );
}

/** Banderines de papel picado que se mecen. Poner arriba de una sección. */
export function PapelPicado({
  colors = alebrijePalette,
  count = 18,
}: {
  colors?: string[];
  count?: number;
}) {
  return (
    <div className="papel-picado" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{ background: colors[i % colors.length], animationDelay: `${(i % 6) * -0.4}s` }}
        />
      ))}
    </div>
  );
}

/** Tira decorativa de patrón alebrije (greca). Variantes: zigzag | dots | scales | diamonds. */
export function PatternStrip({
  kind = 'zigzag',
  className = '',
}: {
  kind?: 'zigzag' | 'dots' | 'scales' | 'diamonds';
  className?: string;
}) {
  return <div className={`pattern-strip pat-${kind} ${className}`} aria-hidden="true" />;
}
