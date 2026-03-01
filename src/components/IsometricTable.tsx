'use client';

import { type ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ComboItem } from '@/lib/combo';
import { ITEM_ICONS } from '@/components/icons';

interface IsometricTableProps {
  combo: ComboItem[];
  comboKey: number;
}

const TABLE_POSITIONS = [
  { x: 0.5,  y: 0.3  },
  { x: 0.25, y: 0.45 },
  { x: 0.75, y: 0.45 },
  { x: 0.35, y: 0.6  },
  { x: 0.65, y: 0.6  },
  { x: 0.5,  y: 0.7  },
];

const itemVariants = {
  hidden: { y: -60, opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: 'spring' as const,
      stiffness: 300,
      damping: 18,
    },
  }),
  exit: {
    y: 60,
    opacity: 0,
    scale: 0.6,
    transition: { duration: 0.2 },
  },
};

export function IsometricTable({ combo, comboKey }: IsometricTableProps) {
  const TABLE_W = 480;
  const TABLE_H = 320;

  const tablePoints = `${TABLE_W * 0.5},20 ${TABLE_W - 20},${TABLE_H * 0.35} ${TABLE_W * 0.5},${TABLE_H * 0.7} 20,${TABLE_H * 0.35}`;
  const leftPoints  = `20,${TABLE_H * 0.35} ${TABLE_W * 0.5},${TABLE_H * 0.7} ${TABLE_W * 0.5},${TABLE_H - 20} 20,${TABLE_H * 0.65}`;
  const rightPoints = `${TABLE_W - 20},${TABLE_H * 0.35} ${TABLE_W * 0.5},${TABLE_H * 0.7} ${TABLE_W * 0.5},${TABLE_H - 20} ${TABLE_W - 20},${TABLE_H * 0.65}`;

  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ height: TABLE_H }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${TABLE_W} ${TABLE_H}`}
        className="absolute inset-0"
      >
        <polygon points={tablePoints} fill="#C8D9C0" />
        <polygon points={leftPoints}  fill="#B0C4A8" />
        <polygon points={rightPoints} fill="#9DB89A" />
        <polygon points={tablePoints} fill="none" stroke="#A8C498" strokeWidth="1" />
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={comboKey}
          className="absolute inset-0"
        >
          {combo.flatMap((comboItem, i) =>
            Array.from({ length: Math.min(comboItem.quantity, 3) }, (_, qIdx) => {
              const posIdx = (i + qIdx) % TABLE_POSITIONS.length;
              const pos = TABLE_POSITIONS[posIdx];
              const Icon = ITEM_ICONS[comboItem.item.id];
              if (!Icon) return null;

              return (
                <motion.div
                  key={`${comboItem.item.id}-${qIdx}`}
                  custom={i + qIdx}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute"
                  style={{
                    left: `${pos.x * 100}%`,
                    top: `${pos.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Icon size={56} />
                  {comboItem.quantity > 1 && qIdx === 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {comboItem.quantity}
                    </span>
                  )}
                </motion.div>
              );
            })
          ).filter((el): el is ReactElement => el !== null)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
