"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { useWebSocket, WebSocketStatus } from './useWebSocket';
import type { ScanEvent, TerminalLine, ResultEventCategory, CATEGORY_COLOR_MAP } from '@/types/event';

interface UseScanStreamOptions {
  scanId: string;
  wsUrl?: string;
  autoConnect?: boolean;
}

interface UseScanStreamReturn {
  lines: TerminalLine[];
  status: WebSocketStatus;
  progress: number;
  isComplete: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
  clearLines: () => void;
}

export function useScanStream({
  scanId,
  wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080',
  autoConnect = true,
}: UseScanStreamOptions): UseScanStreamReturn {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lineIdCounter = useRef(0);

  const addLine = useCallback((category: ResultEventCategory, message: string, metadata?: Record<string, unknown>) => {
    const newLine: TerminalLine = {
      id: `line-${lineIdCounter.current++}`,
      timestamp: new Date(),
      category,
      message,
      metadata,
    };

    setLines(prev => [...prev, newLine]);
  }, []);

  const handleMessage = useCallback((data: unknown) => {
    const event = data as ScanEvent;

    switch (event.type) {
      case 'scan_started':
        addLine('info', `[SCAN] Started scan for target`);
        setProgress(0);
        break;

      case 'scan_progress':
        if (event.data.progress !== undefined) {
          setProgress(event.data.progress);
        }
        break;

      case 'scan_result':
        if (event.data.result) {
          const { result } = event.data;
          const category = (event.data.category || 'info') as ResultEventCategory;
          addLine(category, event.data.message, result.metadata);
        }
        break;

      case 'scan_completed':
        addLine('success', `[COMPLETE] Scan finished successfully`);
        setIsComplete(true);
        setProgress(100);
        break;

      case 'scan_error':
        addLine('error', `[ERROR] ${event.data.error || event.data.message}`);
        setError(event.data.error || event.data.message);
        break;

      case 'scan_cancelled':
        addLine('warning', `[CANCELLED] Scan was cancelled`);
        setIsComplete(true);
        break;
    }
  }, [addLine]);

  const { status, disconnect, reconnect } = useWebSocket({
    url: `${wsUrl}/scan/${scanId}/stream`,
    onMessage: handleMessage,
    onOpen: () => {
      addLine('info', `[CONNECTED] WebSocket connection established`);
    },
    onClose: () => {
      if (!isComplete) {
        addLine('info', `[DISCONNECTED] WebSocket connection closed`);
      }
    },
    onError: () => {
      addLine('error', `[ERROR] WebSocket connection error`);
    },
    reconnect: !isComplete,
  });

  const clearLines = useCallback(() => {
    setLines([]);
    lineIdCounter.current = 0;
  }, []);

  // Auto-connect if enabled
  useEffect(() => {
    if (!autoConnect) {
      return;
    }
    // Connection is handled by useWebSocket
  }, [autoConnect]);

  return {
    lines,
    status,
    progress,
    isComplete,
    error,
    connect: reconnect,
    disconnect,
    clearLines,
  };
}
