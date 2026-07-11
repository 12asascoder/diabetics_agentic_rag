"use client";

import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useStore } from '@/lib/store';

export default function KnowledgeGraph() {
  const { graphData, setGraphData } = useStore();
  const fgRef = useRef<any>(null);

  useEffect(() => {
    // Mock data for UI demonstration
    setGraphData({
      nodes: [
        { id: 'Type 2 Diabetes', name: 'Type 2 Diabetes', val: 20, group: 1 },
        { id: 'GLP-1', name: 'GLP-1 Agonists', val: 15, group: 2 },
        { id: 'Metformin', name: 'Metformin', val: 15, group: 2 },
        { id: 'HbA1c', name: 'HbA1c Reduction', val: 10, group: 3 },
      ],
      links: [
        { source: 'GLP-1', target: 'Type 2 Diabetes', label: 'Treats' },
        { source: 'Metformin', target: 'Type 2 Diabetes', label: 'Treats' },
        { source: 'GLP-1', target: 'HbA1c', label: 'Improves' }
      ]
    });
  }, [setGraphData]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 400 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height || 400
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 bg-gray-800/50 shrink-0">
        <h3 className="font-semibold text-gray-200">Knowledge Graph Viewer</h3>
        <p className="text-xs text-gray-400">Extracted relationships from uploaded documents.</p>
      </div>
      <div ref={containerRef} className="flex-1 min-h-[300px] w-full">
        {graphData.nodes.length > 0 && dimensions.width > 0 && (
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeLabel="name"
            nodeColor={(node: any) => {
              if (node.group === 1) return '#ef4444'; // Disease (Red)
              if (node.group === 2) return '#3b82f6'; // Drug (Blue)
              return '#10b981'; // Biomarker (Green)
            }}
            linkColor={() => '#4b5563'}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="#111827"
          />
        )}
      </div>
    </div>
  );
}
