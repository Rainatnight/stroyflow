"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./cls.module.scss";

export default function VirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const data = Array.from({ length: 1000 }, (_, i) => `Row ${i + 1}`);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className={styles.container}>
      <div
        className={styles.inner}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className={styles.row}
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {data[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
