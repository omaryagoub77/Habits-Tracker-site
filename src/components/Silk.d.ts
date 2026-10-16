import type { FC } from 'react';

export interface SilkProps {
  /** Animation speed. */
  speed?: number;
  /** Pattern scale. */
  scale?: number;
  /** Base colour as a hex string, e.g. `#473587`. */
  color?: string;
  /** Film-grain intensity. */
  noiseIntensity?: number;
  /** UV rotation in radians. */
  rotation?: number;
}

/** Animated silk-plane background rendered with react-three-fiber. */
export const Silk: FC<SilkProps>;
export default Silk;
